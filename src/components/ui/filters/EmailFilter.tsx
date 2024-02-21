"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Autocomplete, Avatar, Chip, TextField } from '@mui/material'
import * as API from '@/utils/app/api'
import { useDebouncedCallback } from 'use-debounce';
import { AzureUser } from '@/types/user';
import { FormikProps } from 'formik';





interface Props {
    value?: AzureUser[],
    name: string,
    label: string,
    formikProp?: FormikProps<any>
    multiple?:boolean
}

const EmailFilter = ({ name, label, formikProp,  multiple=false , value = [] }: Props) => {

    const [options, setOptions] = useState<AzureUser[]>([]);

    // This array will recieve the initial array component
    const [values, setValues] = useState<AzureUser[]>(value);
    // const [ids, setids] = useState<string[]>([]);


    const handleDeleteChip = (valueToDelete: AzureUser) => {
        const newValues = values.filter((value) => value._id !== valueToDelete._id);
        setValues(newValues);
        formikProp?.setFieldValue(name, newValues.map(v => v._id))
    };

    // This debounce is needed to optimise the api calls.
    const debounced = useDebouncedCallback(
        (e, value) => {
            API.PostMethod('azure/getUsers', {
                name: value === "" ? "A" : value,
                exclude: formikProp?.values[name]
            }).then((data) => {
                setOptions(data.data ?? []);
            })
        },
        700 // Using a debounce time of 700
    );

    // const first = name.split('.')[0] as sourcefilters;


    useEffect(() => {
        setValues([]);
        formikProp?.setFieldValue(name, []);

    }, [formikProp?.values['include']]);

    useEffect(() => {
        setValues(value)
    }, [])



    return (
        <>
            <Autocomplete
                options={options}
                filterSelectedOptions
                multiple
                getOptionLabel={(option) => option.displayName}
                value={values}
                onChange={(e, values) => {
                    setValues(values);
                    formikProp?.setFieldValue(name, values.map(val => val._id))
                }}

                onInputChange={(e, value) => {
                    debounced(e, value);
                }}

                clearOnBlur={false}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                        name={name}
                        fullWidth
                        error={formikProp?.touched[name] && formikProp?.errors[name] ? true : false}
                        helperText={formikProp?.errors[name] as string}
                    />
                )}

                renderOption={(props, option) => {

                    const { givenName, surname, displayName } = option;
                    const name = surname && givenName ? givenName.charAt(0) + surname.charAt(0) : displayName.slice(0, 2).toUpperCase();

                    return (
                        <li {...props} key={option._id} className='cursor-pointer flex gap-x-2 py-2 px-2 items-center'>
                            <Avatar sx={{ width: 30, height: 30 , background:"rgb(37,99,235)" }} className='text-sm'>{name}</Avatar>
                            {option.displayName}
                        </li>
                    );
                }}

                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        return (
                            <Chip
                                {...getTagProps({ index })}
                                label={option.displayName}
                                key={index}
                                onDelete={() => handleDeleteChip(option)}
                            />
                        )
                    })
                }
            />
        </>

    )
}

export default EmailFilter;
