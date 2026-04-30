import { FC, ReactNode } from "react";

type LabelProps = {
    children: ReactNode
    id: string
    className: string
};

const FieldLabel: FC<LabelProps> = ({ id, className, children }) => {
    return (
        <label
            htmlFor={id}
            className={className}
        >
            {children}
        </label>
    );
};

export default FieldLabel;