import { FC } from "react";

type FieldErrorProps = {
    message?: string
};

const FieldErrorMessage: FC<FieldErrorProps> = ({ message }) => {
    if(!message) {
        return null;
    }

    return (
        <p className="mt-2 rounded-xl bg-(--form-red-bg) px-3 py-2 text-sm font-bold text-[#b91c1c]">
            {message}
        </p>
    );
};

export default FieldErrorMessage;