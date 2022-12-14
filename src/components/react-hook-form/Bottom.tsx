import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form';
import ErrorSummary from '../ErrorSummary';

const formOptions = {
    name: { required: { value: true, message: "Name is required." } },
    price: { required: { value: true, message: "Price is required." } },
}

function Bottom() {
    const { register, formState: { errors } } = useFormContext();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        // control, // control props comes from useForm (optional: if you are using FormContext)
        name: "items", // unique name for your Field Array
    });
    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '1em' }}>
            <code>Bottom</code>
            <ErrorSummary errors={errors} mode={"FIELD_ARRAY"} />
            <div>
                {fields && fields.length > 0 ? (
                    fields.map((field, index) => (
                        <div key={field.id} style={{ display: 'flex', gap: '0.5em' }}>
                            <input // important to include key with field's id
                                {...register(`items.${index}.name`, formOptions.name)}
                                style={{ backgroundColor: (errors.items?.[index]?.name ? 'gray' : '') }}
                            />
                            <input
                                // key={field.id} // important to include key with field's id
                                {...register(`items.${index}.price`, formOptions.price)}
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                            >
                                -
                            </button>
                            <button
                                type="button"
                                onClick={() => insert(index, { name: '', price: 0 })}
                            >
                                +
                            </button>
                        </div>
                    ))
                ) : (
                    <button type="button" onClick={() => append({ name: '', price: 0 })}>
                        Add a item
                    </button>
                )}
            </div>
        </div>
    );
}

export default Bottom;
