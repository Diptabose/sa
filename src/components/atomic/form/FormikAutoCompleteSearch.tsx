"use client"
import React, { useState, useEffect } from 'react'
import { Autocomplete, Avatar, Chip, TextField } from '@mui/material'
import * as API  from '@/utils/app/api'
import { useDebouncedCallback } from 'use-debounce';
import { AzureUser } from '@/types/user';
import { useFormikContext } from 'formik';
import { SourceFilterValues, sourcefilters } from '@/types/formik';




interface Props {
    value: AzureUser[],
    name: string,
    label: string,
}

const FormikAutoCompleteSearch = ({ name, label, value = [] }: Props) => {


    const filterform = useFormikContext<SourceFilterValues>();

    const [options, setOptions] = useState<AzureUser[]>([
        // {
        //     id: 1,
        //     name: 'Ashok Palla',

        // },
        // {
        //     id: 2,
        //     name: 'JayKumar'
        // },
        // {
        //     id: 3,
        //     name: "Bose"
        // }
    ]);

    // This array will recieve the initial array component
    const [values, setValues] = useState<AzureUser[]>(value);
    const [ids, setids] = useState<string[]>([]);


    const handleDeleteChip = (valueToDelete: AzureUser) => {
        const newValues = values.filter((value) => value._id !== valueToDelete._id);
        setValues(newValues);

        filterform.setFieldValue(name, newValues.map(v => v.id))

    };

    // This debounce is needed to optimise the api calls.
    const debounced = useDebouncedCallback(
        (e, value) => {
            API.PostMethod('azure/getUsers', {
                name: value === "" ? "A" : value,
                exclude: ids
            }).then((data) => {
                setOptions(data.data ?? []);
            })
        },
        700 // Using a debounce time of 700
    );

    const first = name.split('.')[0] as sourcefilters;

    useEffect(() => {
        setValues([]);
        filterform.setFieldValue(name, []);
    }, [filterform.values[first].include])



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
                    filterform.setFieldValue(name, values.map(val => val._id))
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
                        error={filterform.touched[first]?.include && filterform.errors[first]?.include? true:false}
                        helperText={filterform.errors[first]?.include}
                    />
                )}

                renderOption={(props, option) => {

                    const { givenName, surname, displayName } = option;
                    const name = surname && givenName ? givenName.charAt(0) + surname.charAt(0) : displayName.slice(0, 2).toUpperCase();

                    return (
                        <li {...props} key={option._id} className='cursor-pointer flex gap-x-2 py-2 px-2 items-center'>
                            <Avatar sx={{ width: 30, height: 30 , color:"rgb(37 99 23)" }}  className='text-sm'>{name}</Avatar>
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

export default FormikAutoCompleteSearch
