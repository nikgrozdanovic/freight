import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { FieldProps } from "formik"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputFields = ({
    field, 
    form: _, 
    ...props
}: FieldProps & InputProps) => {
    return (
        <input {...field} {...props} className="form-control" />
    )
}