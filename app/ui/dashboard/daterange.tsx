'use client'

import { useAppContext } from "@/app/context/AppContext";
import { ArrowRightIcon } from "@mui/x-date-pickers/icons";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import {useAppStore} from '@/app/lib/store'


const DateRangeSelector = () => {

    const startDate =  useAppStore((state) => state.startDate);
    const endDate =  useAppStore((state) => state.endDate);
    const updateStartDate = useAppStore((state) => state.updateStartDate);
    const updateEndDate = useAppStore((state) => state.updateEndDate);

    return (
            
            <div className="pt-1">
                <label className="text-sm">
                    <DatePicker key='startDate'
                        defaultValue={dayjs(startDate, 'YYYY-MM-DD')}
                        name='startDate'
                        onChange={(e) => updateStartDate(e.format('YYYY-MM-DD'))}
                        className="max-w-[150px]" />
                </label>
            
                <ArrowRightIcon className="text-gray-400" />
                <DatePicker key='endDate'
                    defaultValue={dayjs(endDate, 'YYYY-MM-DD')}
                    name='endDate'
                    onChange={(e) => updateEndDate(e.format('YYYY-MM-DD'))}
                    className="max-w-[150px]" />
            </div>
    );
};

export default DateRangeSelector;
