interface ActionData {
    errors: {
        email?: string;
        password?: string;
    };
    formError?: string;
    fields?: {
        email?: string;
        password?: string;
    };
}

export default ActionData;