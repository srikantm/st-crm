'use server';

import { z } from 'zod';
import { insertQuery, query } from './mysql';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateInvoiceForm, CreatePaymentField, CreateQuoteForm } from './definitions';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from "../../auth";



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


export async function updateInvoiceStatus(invoiceId:string, status:string){

  await query(`update crm_invoices set invoice_status = '${status}' where id = ${invoiceId} `, []);
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  return;
};

const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});


export async function createInvoiceForm(invoiceData: CreateInvoiceForm) {
  const session = await auth();
  const userId = session?.user.id;
  try {

    const insertInvoiceQuery = `
    insert into crm_invoices 
    (invoice_number, lead_id, customer_id, currency_id, invoice_status, invoice_date, expiry_date, note, tax_id, tax_slab,invoice_sub_amount, tax_amount, invoice_total_amount, user_id)
    VALUES ('${invoiceData.invoiceNumber}', ${invoiceData.leadId}, ${invoiceData.customerId}, '${invoiceData.currencyId}', '${invoiceData.invoiceStatus}',
            '${invoiceData.invoiceDate}', '${invoiceData.invoiceExpiryDate}', '${invoiceData.note}', '${invoiceData.invoiceTaxId}',
            '${invoiceData.invoiceTaxValue}', '${invoiceData.invoiceSubTotal}', '${invoiceData.invoiceTaxAmount}', '${invoiceData.invoiceTotalAmount}', '${userId}'
             )`;

    const insertId= await insertQuery(insertInvoiceQuery, []);

    const invoiceId = insertId;

    if (invoiceId) {
      let insertInvoiceProductMappingQuery =
        `insert into crm_invoice_product_mapping 
      (invoice_id, product_id, description, quantity, price, total_amount, user_id)
      values `;
      invoiceData.invoiceItems.map((data, i) => {
        insertInvoiceProductMappingQuery += ` (${invoiceId} , ${data.productId}, '${data.description}', ${data.quantity}, ${data.itemPrice},${data.itemTotalAmount}, ${userId}) `;
        if (invoiceData.invoiceItems.length != i + 1) {
          insertInvoiceProductMappingQuery += `,`;
        }
      })
      await query(insertInvoiceProductMappingQuery, []);
    }


  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  return;
}


export async function createQuoteForm(invoiceData: CreateInvoiceForm) {
  const session = await auth();
  const userId = session?.user.id;

  try {

    const insertInvoiceQuery = `
    insert into crm_quotes 
    (quote_number,lead_id, customer_id,  currency_id, quote_status, quote_date, expiry_date, note, tax_id, tax_slab,quote_sub_amount, tax_amount, quote_total_amount, user_id)
    VALUES ('${invoiceData.invoiceNumber}', ${invoiceData.leadId}, ${invoiceData.customerId}, '${invoiceData.currencyId}', '${invoiceData.invoiceStatus}',
            '${invoiceData.invoiceDate}', '${invoiceData.invoiceExpiryDate}', '${invoiceData.note}', '${invoiceData.invoiceTaxId}',
            '${invoiceData.invoiceTaxValue}', '${invoiceData.invoiceSubTotal}', '${invoiceData.invoiceTaxAmount}', '${invoiceData.invoiceTotalAmount}', '${userId}'
             )`;

    const insertId = await insertQuery(insertInvoiceQuery, []);

    const quoteId = insertId;

    if (quoteId) {
      let insertInvoiceProductMappingQuery =
        `insert into crm_quote_product_mapping 
      (quote_id, product_id, description, quantity, price, total_amount, user_id)
      values `;
      invoiceData.invoiceItems.map((data, i) => {
        insertInvoiceProductMappingQuery += ` (${quoteId} , ${data.productId}, '${data.description}', ${data.quantity}, ${data.itemPrice},${data.itemTotalAmount}, ${userId}) `;
        if (invoiceData.invoiceItems.length != i + 1) {
          insertInvoiceProductMappingQuery += `,`;
        }
      })
      await query(insertInvoiceProductMappingQuery, []);
    }


  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Quote.',
    };
  }
  revalidatePath('/dashboard/quotes');
  redirect('/dashboard/quotes');
  return;
}

export async function updateInvoiceForm(invoiceData: CreateInvoiceForm) {
  const session = await auth();
  const userId = session?.user.id;
  try {

    const updateSql = `
    update crm_invoices
    set
    invoice_number = '${invoiceData.invoiceNumber}', customer_id = ${invoiceData.customerId}, invoice_status = '${invoiceData.invoiceStatus}',
    invoice_date = '${invoiceData.invoiceDate}', expiry_date = '${invoiceData.invoiceExpiryDate}', note = '${invoiceData.note}',
    tax_id = '${invoiceData.invoiceTaxId}', tax_slab = '${invoiceData.invoiceTaxValue}', invoice_sub_amount = '${invoiceData.invoiceSubTotal}',
    tax_amount = '${invoiceData.invoiceTaxAmount}', invoice_total_amount = '${invoiceData.invoiceTotalAmount}',
    user_id = ${userId}
    where 
    id = ${invoiceData.invoiceId}
    `;

    const result = await query(updateSql, []);
    
    if (invoiceData.invoiceId) {
      // inactiving old records mapped to invoice_id in crm_invoice_product_mapping
      const updateQuery = `update crm_invoice_product_mapping set is_active = '0' where invoice_id = ${invoiceData.invoiceId}`;
      await query(updateQuery, []);

      invoiceData.invoiceItems.map(async (data, i)=>{
        // if(data.id){
        //   let sql = `update crm_invoice_product_mapping 
        //               set 
        //               product_id = ${data.productId}, description = '${data.description}', quantity=${data.quantity},
        //                price = ${data.itemPrice}, total_amount = ${data.itemTotalAmount}, user_id=${userId}
        //               where 
        //               id = ${data.id} `;
        //   await query(sql, []);            
        // }else{
          let sql = ` insert into crm_invoice_product_mapping 
                      (invoice_id, product_id, description, quantity, price, total_amount, user_id)
                      values
                      (${invoiceData.invoiceId}, ${data.productId}, '${data.description}', ${data.quantity}, ${data.itemPrice},${data.itemTotalAmount},${userId})`;
          await query(sql, []);            
        //}
      }) 
    }

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  return;
}


export async function updateInvoicePayment(recordPayment: CreatePaymentField) {
  const session = await auth();
  const userId = session?.user.id;
  try {

     let sql = ` insert into crm_payments 
                    (invoice_id, reference_number, payment_mode_id, amount, description, payment_date, user_id)
                    values
                    (${recordPayment.invoice_id},'${recordPayment.referenece_number}',${recordPayment.payment_mode},${recordPayment.amount},
                    '${recordPayment.description}', '${recordPayment.payment_date}', ${userId})`;
     await query(sql,[]);
    
     let updateCrmInvoice = `update crm_invoices set amount_paid = ${recordPayment.total_amount_paid}, invoice_status = '${recordPayment.invoice_status}', user_id = ${userId}
     where id = ${recordPayment.invoice_id}`;
     await query(updateCrmInvoice, [])

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Payments.',
    };
  }
  revalidatePath(`/dashboard/invoices/${recordPayment.invoice_id}/record-payment`);
  redirect(`/dashboard/invoices/${recordPayment.invoice_id}/record-payment`);
  return;
}

export async function updateQuoteForm(quoteData: CreateQuoteForm) {
  const session = await auth();
  const userId = session?.user.id;
  try { 

    const insertInvoiceQuery = `
    update crm_quotes 
    set
    quote_number = '${quoteData.quoteNumber}', customer_id = ${quoteData.customerId}, quote_status = '${quoteData.quoteStatus}',
    quote_date = '${quoteData.quoteDate}', expiry_date = '${quoteData.quoteExpiryDate}', note = '${quoteData.note}',
    tax_id = '${quoteData.quoteTaxId}', tax_slab = '${quoteData.quoteTaxValue}', quote_sub_amount = '${quoteData.quoteSubTotal}',
    tax_amount = '${quoteData.quoteTaxAmount}', quote_total_amount = '${quoteData.quoteTotalAmount}', user_id = ${userId}
    where 
    id = ${quoteData.quoteId}
    `;

    const result = await query(insertInvoiceQuery, []);


    if (quoteData.quoteId) {
      // inactiving old records mapped to invoice_id in crm_invoice_product_mapping
      const updateQuery = `update crm_quote_product_mapping set is_active = '0' where quote_id = ${quoteData.quoteId}`;
      await query(updateQuery, []);

      quoteData.quoteItems.map(async (data, i)=>{
        // if(data.id){
        //   let sql = `update crm_quote_product_mapping 
        //               set 
        //               product_id = ${data.productId}, description = '${data.description}', quantity=${data.quantity}, price = ${data.itemPrice},
        //               total_amount = ${data.itemTotalAmount}, user_id = ${userId}
        //               where 
        //               id = ${data.id} `;
        //   await query(sql, []);            
        // }else{
          let sql = ` insert into crm_quote_product_mapping 
                      (quote_id, product_id, description, quantity, price, total_amount, user_id)
                      values
                      (${quoteData.quoteId}, ${data.productId}, '${data.description}', ${data.quantity}, ${data.itemPrice},${data.itemTotalAmount}, ${userId})`;
          await query(sql, []);            
        // }
      }) 
    }

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Quote.',
    };
  }
  revalidatePath('/dashboard/quotes');
  redirect('/dashboard/quotes');
  return;
}


export async function deleteInvoice(id: string) {
  try {
    await query(`DELETE FROM invoices WHERE id = ${id}`, []);
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
}




const LeadFormSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhoneNumber: z.string(),
  leadAmount: z.coerce.number(),
  leadStatus: z.enum(['draft', 'new', 'negotiation', 'won', 'lost', 'cancelled']),
  date: z.string(),
});

const UpdateLeadFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  customerId: z.string(),
  source: z.string(),
  leadType: z.string(),
  expectedCloseDate: z.string(),
  assignedUser: z.string(),
  leadAmount: z.coerce.number(),
  leadStatus: z.string(),
});

const CreateLeadFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  source: z.string(),
  leadType: z.string(),
  customerId: z.string(),
  leadStatus: z.enum(['draft', 'new', 'negotiation', 'won', 'lost', 'cancelled']),
  leadAmount: z.coerce.number(),
  expectedCloseDate: z.coerce.date(),
  assignedUser: z.string(),
});

const CreateCustomerFormSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerNumber: z.string(),
  customerType: z.string(),
});


const CreateLead = CreateLeadFormSchema.omit({ id: true, assignedUser: true });

export async function createLead(formData: FormData) {
  const { title, description, source, leadType, customerId, leadStatus, leadAmount, expectedCloseDate } = CreateLead.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    source: formData.get('source'),
    leadType: formData.get('leadType'),
    customerId: formData.get('customerId'),
    leadStatus: formData.get('leadStatus'),
    leadAmount: formData.get('leadAmount'),
    expectedCloseDate: formData.get('expectedCloseDate'),
  });

  const d = expectedCloseDate;
  var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  try {
    const session = await auth();
    const userId = session?.user.id;
    await query(`
    INSERT INTO crm_leads (title, description, source, lead_type, customer_id, lead_status, lead_amount, expected_close_date, user_id)
    VALUES ('${title}', '${description}', '${source}', '${leadType}',${customerId}, '${leadStatus}', ${leadAmount}, '${datestring}', ${userId})`,[]);

  } catch (error) {
    console.log(error);
    return {
      message: `Database Error: Failed to Create Lead.: ${error}`,
    };
  }
  revalidatePath('/dashboard/leads');
  redirect('/dashboard/leads');
}


const CreateCustomer = CreateCustomerFormSchema.omit({ id: true});

export async function createCustomer(formData: FormData) {
  const session = await auth();
  const userId = session?.user.id;
  const { customerName, customerType, customerEmail, customerNumber} = CreateCustomer.parse({
    customerName: formData.get('customerName'),
    customerType: formData.get('customerType'),
    customerEmail: formData.get('customerEmail'),
    customerNumber: formData.get('customerNumber'),
  });

  try {

    await query(`
    INSERT INTO crm_customers (name, type, email, contact_number, user_id)
    VALUES ('${customerName}', '${customerType}', '${customerEmail}', '${customerNumber}', ${userId})`);

  } catch (error) {
    console.log(error);
    return {
      message: `Database Error: Failed to Create Lead.: ${error}`,
    };
  }
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

const UpdateCustomer = CreateCustomerFormSchema.omit({ id: true});

export async function updateCustomer(id: string,formData: FormData) {
  
  const { customerName, customerType, customerEmail, customerNumber} = UpdateCustomer.parse({
    customerName: formData.get('customerName'),
    customerType: formData.get('customerType'),
    customerEmail: formData.get('customerEmail'),
    customerNumber: formData.get('customerNumber'),
  });

  try {
    const session = await auth();
    const userId = session?.user.id;
    await query(`
    update crm_customers
    set
    name = '${customerName}', email = '${customerEmail}', type = '${customerType}', contact_number = '${customerNumber}', user_id = ${userId}
    where id = ${id} `, []);

  } catch (error) {
    console.log(error);
    return {
      message: `Database Error: Failed to Create Lead.: ${error}`,
    };
  }
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

const UpdateLead = UpdateLeadFormSchema.omit({ id: true,assignedUser:true });

export async function updateLead(id: string, formData: FormData) {

  const { title, description, customerId, source, leadType,
     expectedCloseDate, leadAmount, leadStatus } = UpdateLead.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    customerId: formData.get('customerId'),
    source: formData.get('source'),
    leadType: formData.get('leadType'),
    expectedCloseDate: formData.get('expectedCloseDate'),
    //assignedUser: formData.get('assignedUser'),
    leadAmount: formData.get('leadAmount'),
    leadStatus: formData.get('leadStatus')
  });

  try {
    const session = await auth();
    const userId = session?.user.id;
    const sqlQuery = `
    UPDATE crm_leads
    SET title = '${title}', description = '${description}', customer_id = '${customerId}',
        source = '${source}', lead_type = '${leadType}', expected_close_date = '${expectedCloseDate}',
        lead_amount = ${leadAmount}, lead_status = '${leadStatus}', user_id = ${userId}
    WHERE id = ${id}
  `;
   const result = await query(sqlQuery,[]);
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Lead.',
    };
  }
  revalidatePath('/dashboard/leads');
  redirect('/dashboard/leads');
}



export async function saveProduct(formData: { packages?: { packageName: string; packageCode: string; packageListImages: never[]; packageDetailImages: never[]; departureCityDatesMappings: {}; touringCities: never[]; tourIncludes: any[]; durationDays: string; durationNights: string; packageRating: string; totalPackageReviews: string; packageRates: any[]; packageTypes: any[]; packageThemes: any[]; itineraries: { itineraryTitle: string; cityIds: never[]; description: string; note: string; itineraryDate: string; itineraryAddons: { itineraryAddonType: string; description: string; }[]; }[]; tourInformation: any[]; tourDetails: { flightDetails: { departureCityId: number; arrivalCityId: number; departureDate: string; arrivalDate: string; flightName: string; }[]; accommodationDetails: any[]; reportingAndDroppings: { guestType: string; reportingPoint: string; droppingPoint: string; }[]; }; }[]; get?: any; }) {

  console.log("formData", formData);


  const domain =  process.env.NEXT_PUBLIC_API_URL;
  const url = `${domain}/v1/package/add`;

  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  };

  await fetch(url, requestOptions)
      .then(response => {
          // Check if the request was successful
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // Parse the JSON response
          return response.json();

      })
      .then(d => {
          // Handle the data returned from the server
          d.response
      })
      .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('There was a problem with the fetch operation:', error);
      });
  
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(formData: { packages?: { packageName: string; packageCode: string; packageListImages: never[]; packageDetailImages: never[]; departureCityDatesMappings: {}; touringCities: never[]; tourIncludes: any[]; durationDays: string; durationNights: string; packageRating: string; totalPackageReviews: string; packageRates: any[]; packageTypes: any[]; packageThemes: any[]; itineraries: { itineraryTitle: string; cityIds: never[]; description: string; note: string; itineraryDate: string; itineraryAddons: { itineraryAddonType: string; description: string; }[]; }[]; tourInformation: any[]; tourDetails: { flightDetails: { departureCityId: number; arrivalCityId: number; departureDate: string; arrivalDate: string; flightName: string; }[]; accommodationDetails: any[]; reportingAndDroppings: { guestType: string; reportingPoint: string; droppingPoint: string; }[]; }; }[]; get?: any; }) {


  const domain = process.env.NEXT_PUBLIC_API_URL;
  const url = `${domain}/v1/package/update`;

  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  };

  let response;
  await fetch(url, requestOptions)
      .then(response => {
          // Check if the request was successful
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // Parse the JSON response
          return response.json();

      })
      .then(d => {
          // Handle the data returned from the server
          response = d.response
      })
      .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('There was a problem with the fetch operation:', error);
      });
      
  
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deactivateProduct(packageId: string) {
  try {
    const domain = process.env.NEXT_PUBLIC_API_URL;
    const url = `${domain}/v1/package/status`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        packageId: packageId,
        status: 'INACTIVE'
      })
    };

    await fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Package deactivated successfully:', data);
      })
      .catch(error => {
        console.error('Error deactivating package:', error);
      });

    revalidatePath('/dashboard/products');
    return { success: true };
  } catch (error) {
    console.error('Error in deactivateProduct function:', error);
    return { success: false, error: 'Failed to deactivate package' };
  }
}