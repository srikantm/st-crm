'use client';

import { CreateInvoiceForm, CreateQuoteForm, CurriencyField, CustomerField, EditQuoteForm as EQF, InvoiceItem, InvoiceItemForm, LeadForm, PackageField, QuoteItemForm, TaxField } from '@/app/lib/definitions';
import {
  CurrencyRupeeIcon,
  PlusIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateQuoteForm } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Col, DatePicker, Divider, InputNumber, Row, Button as Btn } from 'antd';
import { font } from '../fonts';

export default function EditQuoteForm({ quote, customers, currencies, taxes, packages, quoteItemList, leads }:
  { quote: EQF, customers: CustomerField[], currencies: CurriencyField[], taxes: TaxField[], packages: PackageField[], quoteItemList: QuoteItemForm[], leads: LeadForm[] }) {

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    let list = [...invoiceItems];
    quoteItemList.map((item, i) => {
      let obj: InvoiceItem = {
        id: item.id,
        productId: item.product_id,
        productName: "",
        itemName: "",
        description: item.description,
        quantity: item.quantity,
        itemPrice: item.price,
        itemTotalAmount: item.total_amount
      };
      list[i] = obj;
    })
    setInvoiceItems(list);
  }, []);

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { id: "", productId: '', productName: "", itemName: '', description: '', quantity: 0, itemPrice: 0, itemTotalAmount: 0 }]);
  }


  const [formData, setFormData] = useState<CreateQuoteForm>({
    quoteId: quote.quote_id,
    customerId: quote.customer_id,
    leadId: quote.lead_id,
    quoteNumber: quote.quote_number,
    currencyId: quote.currency_id,
    currencySymbol: quote.currency_symbol,
    quoteStatus: quote.quote_status,
    quoteDate: quote.quote_date,
    quoteExpiryDate: quote.expiry_date,
    note: quote.note,
    quoteItems: invoiceItems,
    quoteSubTotal: quote.quote_sub_amount,
    quoteTaxId: quote.tax_id,
    quoteTaxValue: quote.tax_slab,
    quoteTaxAmount: quote.tax_amount,
    quoteTotalAmount: quote.quote_total_amount
  });


  const editQuote = () => {
    setFormData((prevData) => ({ ...prevData, quoteItems: invoiceItems }));

    updateQuoteForm(formData);
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name == 'leadId') {
      let customerId = '';
      leads.map((data, i) => {
        if (data.lead_id == value) {
          customerId = data.customer_id;
        }
      })
      setFormData((prevData) => ({ ...prevData, leadId: value, customerId: customerId }));
      return;
    }

    if (name == 'customerId') {
      setFormData((prevData) => ({ ...prevData, customerId: value }));
      return;
    }
    if (name === 'currencyId') {
      let currencySymbol = '';
      currencies.map((d, i) => {
        if (value == d.id) {
          currencySymbol = d.symbol;
        }
      })
      setFormData((prevData) => ({ ...prevData, currencyId: value, currencySymbol: currencySymbol }));
      return;
    }
    if (name === 'invoiceStatus') {
      setFormData((prevData) => ({ ...prevData, quoteStatus: value }));
      return;
    }

    if (name === 'taxRate') {

      let taxValue = 0;
      taxes.map((d, i) => {
        if (value == d.id) {
          taxValue = d.value;
        }
      })
      let subTotal = 0;
      invoiceItems.map((item, i) => {
        subTotal += item.quantity! * item.itemPrice!;
      });
      let invoiceTaxAmount = (taxValue / 100) * subTotal;
      let totalInvoiceAmount = subTotal + invoiceTaxAmount;
      setFormData((prevData) => ({
        ...prevData, quoteTaxId: value,
        quoteTaxValue: taxValue,
        quoteSubTotal: subTotal,
        quoteTaxAmount: invoiceTaxAmount,
        quoteTotalAmount: totalInvoiceAmount
      }));
      return;
    }

  }

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    if (name === 'productId') {
      const list = [...invoiceItems];
      list[index].productId = value;
      setInvoiceItems(list);
      return;
    }
  }

  const handleDateChange = (date: Dayjs, name: string) => {
    let formatedDated = '';
      if(date != null){
        formatedDated = date.format('YYYY-MM-DD');
      }
     
    if (name === 'invoiceDate') {
      setFormData((prevData) => ({ ...prevData, quoteDate: formatedDated }));
      return;
    }
    if (name === 'invoiceExpiryDate') {
      setFormData((prevData) => ({ ...prevData, quoteExpiryDate: formatedDated }));
      return;
    }
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'note') {
      setFormData((prevData) => ({ ...prevData, note: value }));
      return;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    if (name === 'itemName') {
      const list = [...invoiceItems];
      list[index].itemName = value;
      setInvoiceItems(list);
      return;
    }
    if (name === 'itemDescription') {
      const list = [...invoiceItems];
      list[index].description = value;
      setInvoiceItems(list);
      return;
    }
  }

  const handleInputNumberChange = (value: number | null, index: number, name: string) => {
    if (name === 'itemQuantity') {
      const list = [...invoiceItems];
      list[index].quantity = Number(value);
      list[index].itemTotalAmount = (list[index].itemPrice! * value!)
      setInvoiceItems(list);
      return;
    }
    if (name === 'itemPrice') {
      const list = [...invoiceItems];
      list[index].itemPrice = value;
      list[index].itemTotalAmount = (list[index].quantity! * value!)
      setInvoiceItems(list);
      return;
    }
    if (name === 'itemTotalAmount') {
      const list = [...invoiceItems];
      list[index].itemTotalAmount = value;
      setInvoiceItems(list);
      return;
    }
  }

  useEffect(() => {
    let subTotal = 0;
    invoiceItems.map((item, i) => {
      subTotal += item.quantity! * item.itemPrice!;
    });
    let invoiceTaxAmount = (formData.quoteTaxValue / 100) * subTotal;
    let totalInvoiceAmount = subTotal + invoiceTaxAmount;
    setFormData((prevData) => ({ ...prevData, quoteSubTotal: subTotal, quoteTaxAmount: invoiceTaxAmount, quoteTotalAmount: totalInvoiceAmount, quoteItems: invoiceItems }));
  }, [invoiceItems]);

  return (
    // <form action={createInvoice}>
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-wrap">

          {/* Lead Title */}
          <div className="p-3 mb-5 basis-1/4">
            <label htmlFor="leadId" className="mb-2 block text-sm font-medium">
              Lead
            </label>
            <div className="relative">
              <select
                id="leadId"
                name="leadId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.leadId}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select Lead</option>
                {leads.map((lead) => (
                  <option key={lead.lead_id} value={lead.lead_id}>{lead.title}</option>
                ))}

              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {formData.leadId === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please Select Lead</label>}
          </div>

          {/* Customer Name */}
          <div className="p-3 mb-5 basis-1/4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Customer
            </label>
            <div className="relative">
              <select
                id="customerId"
                name="customerId"
                className="peer block w-full cursor-pointer rounded-md border bg-gray-100 border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.customerId}
                onChange={(e) => handleSelectChange(e)}
                disabled
              >
                <option value="" disabled>Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}

              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>

          </div>

          {/* Invoice Number */}
          {/* <div className="p-3 mb-5 basis-1/4">
            <label htmlFor="invoiceNumber" className="mb-2 block text-sm font-medium">
              Invoice Number
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  disabled
                  className="peer block w-full rounded-md border bg-gray-100 border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div> */}

          {/* </div>
          <div className="flex flex-row"> */}
          {/* Currency */}
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="currencyId" className="mb-2 block text-sm font-medium">
              Currency
            </label>
            <div className="relative">
              <select
                id="currencyId"
                name="currencyId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.currencyId}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>{currency.symbol + "(" + currency.name + ")"} </option>
                ))}
              </select>
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {formData.currencyId === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please Select Currency</label>}
          </div>

          {/* Invoice Status */}
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="invoiceStatus" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <div className="relative">
              <select
                id="invoiceStatus"
                name="invoiceStatus"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.quoteStatus}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select a Status</option>
                {/* <option key="1" value="INR">₹-INR</option> */}
                <option key="2" value="pending">Pending</option>
                <option key="3" value="sent">Sent</option>
                <option key="4" value="negotiation">Negotiation</option>
                <option key="5" value="finalized">Finalized</option>
                <option key="6" value="invoiced">Invoiced</option>
              </select>
            </div>
            {formData.quoteStatus === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please select Quote Status </label>}
          </div>
        </div>

        <div className="flex flex-wrap">


          {/* InvoiceDate */}
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="invoiceDate" className="mb-2 block text-sm font-medium">
              Date
            </label>
            <div className="relative">
              <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'}
                value={formData.quoteDate !== '' ? dayjs(formData.quoteDate, 'YYYY-MM-DD', 'en') : null}
                onChange={(e) => handleDateChange(e, 'invoiceDate')} />
            </div>
            {formData.quoteDate === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please select Quote Date </label>}
          </div>
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="invoiceExpiryDate" className="mb-2 block text-sm font-medium">
              Expiry Date
            </label>
            <div className="relative">
              <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'}
                value={formData.quoteExpiryDate !== '' ? dayjs(formData.quoteExpiryDate, 'YYYY-MM-DD', 'en') : null}
                onChange={(e) => handleDateChange(e, 'invoiceExpiryDate')} />
            </div>
            {formData.quoteExpiryDate === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please select Expiry Date </label>}

          </div>
          <div className="p-3 mb-4 basis-1/2">
            <label htmlFor="note" className="mb-2 block text-sm font-medium">
              Note
            </label>
            <div className="grow h-20" >
              <textarea
                id="note"
                name="note"
                placeholder="note ..."
                className="peer block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => handleTextAreaChange(e)}
                value={formData.note}
              />
            </div>
          </div>
        </div>

        <Divider dashed style={{ borderColor: '#cccccc' }} />

        <div >
          <Row gutter={[12, 12]} style={{ position: 'relative' }}>
            <Col className="gutter-row" span={5}>
              <p>{'Item'}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{'Description'}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{'Quantity'}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <p>{'Price'}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <p>{'Total'}</p>
            </Col>

          </Row>

          {invoiceItems.map((data, i) => {
            return (
              <Row key={i} gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={5}>
                  <div className="relative mt-2 rounded-md">
                    {/* <div className="relative">
                      <input
                        id="itemName"
                        name="itemName"
                        type="text"
                        placeholder="Item Name"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        onChange={(e) => handleInputChange(e, i)}
                        value={invoiceItems[i].itemName}
                      />
                    </div> */}
                    <div className="relative">
                      <select
                        id="productId"
                        name="productId"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                        value={invoiceItems[i].productId}
                        onChange={(e) => handleProductChange(e, i)}
                        defaultValue={""}
                      >
                        <option value="" disabled>Select Product</option>
                        {packages.map((pckage) => (
                          <option key={pckage.id} value={pckage.id}>{pckage.package_name} </option>
                        ))}
                      </select>
                    </div>
                    {invoiceItems[i].productId === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please select Product</label>}
                  </div>
                </Col>
                <Col className="gutter-row" span={7}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id="itemDescription"
                        name="itemDescription"
                        type="text"
                        placeholder="Discription"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        onChange={(e) => handleInputChange(e, i)}
                        value={invoiceItems[i].description}
                      />
                    </div>
                    {invoiceItems[i].description === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please select Description</label>}
                  </div>
                </Col>
                <Col className="gutter-row" span={3}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">

                      <InputNumber
                        min={0}
                        controls={false}
                        onChange={(e) => handleInputNumberChange(e, i, 'itemQuantity')}
                        value={invoiceItems[i].quantity}
                      />
                    </div>
                    {invoiceItems[i].quantity === null || invoiceItems[i].quantity === 0 && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Quantity *</label>}
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <InputNumber
                        min={0}
                        controls={false}
                        addonBefore={formData.currencySymbol}
                        onChange={(e) => handleInputNumberChange(e, i, 'itemPrice')}
                        value={invoiceItems[i].itemPrice}
                      />
                    </div>
                    {invoiceItems[i].itemPrice === null || invoiceItems[i].itemPrice === 0 && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Price *</label>}
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <InputNumber
                        min={0}
                        controls={false}
                        addonBefore={formData.currencySymbol}
                        onChange={(e) => handleInputNumberChange(e, i, 'itemTotalAmount')}
                        value={(invoiceItems[i].quantity! * invoiceItems[i].itemPrice!)}
                        disabled
                      />
                    </div>
                  </div>
                </Col>

                <div>
                  <button className="rounded-md border p-2 hover:bg-gray-100"
                    onClick={() => {
                      const newArr = [...invoiceItems];
                      newArr.splice(i, 1);
                      setInvoiceItems(newArr);
                    }}>
                    <TrashIcon className="w-5 h-4" />
                  </button>
                </div>
              </Row>
            );
          })}
          <div style={{ paddingTop: 15 }}>
            <Btn
              key={'addField'}
              type="dashed"
              onClick={() => addInvoiceItem()}
              block
              icon={<PlusIcon />}
              style={{ paddingTop: 5 }}
            >
              {'Add field'}
            </Btn>
          </div>

          <Row gutter={[12, 12]} style={{ position: 'relative', paddingTop: 15 }}>
            <Col className="gutter-row" span={5}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <label htmlFor="subTotal" className="mb-2 block text-sm font-medium" style={{ textAlign: "right", alignContent: "center", paddingTop: 5 }}>
                Sub Total :
              </label>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="relative">
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore={formData.currencySymbol}
                  value={formData.quoteSubTotal}
                  disabled
                />
              </div>
            </Col>

          </Row>

          <Row gutter={[12, 12]} style={{ position: 'relative', paddingTop: 15 }}>
            <Col className="gutter-row" span={5}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <select
                id="taxRate"
                name="taxRate"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => handleSelectChange(e)}
                defaultValue={""}
                value={formData.quoteTaxId}
              >
                <option value="" disabled>Select Tax</option>
                {taxes.map((tax) => (
                  <option key={tax.id} value={tax.id}>{tax.name + " - " + tax.value + "%"}</option>
                ))}
              </select>
              {formData.quoteTaxId === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Please Select Tax</label>}
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="relative">
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore={formData.currencySymbol}
                  value={formData.quoteTaxAmount}
                  disabled
                />
              </div>
            </Col>

          </Row>

          <Row gutter={[12, 12]} style={{ position: 'relative', paddingTop: 15 }}>
            <Col className="gutter-row" span={5}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <label htmlFor="totalAmount" className="mb-2 block text-sm font-medium" style={{ textAlign: "right", alignContent: "center", paddingTop: 5 }}>
                Total Amount :
              </label>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="relative">
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore={formData.currencySymbol}
                  value={formData.quoteTotalAmount}
                  disabled
                />
              </div>
            </Col>

          </Row>
        </div>


        {/* <Divider dashed style={{ borderColor: '#9c9c9c' }} /> */}

        {/* ---------------- */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/quotes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button onClick={editQuote}>Update Quote</Button>
      </div>
    </>
  );
}