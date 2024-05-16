export default function ConfirmationPanel ({ data, setConfirmationPanel }) {

    const {
        message,
        submessage,
        buttonText,
        handler
    } = data;

    return <div className="bg-background2 rounded-sm py-6 px-2 mt-4 mx-auto text-white block max-w-sm">
        <h4 className="text-center font-bold text-lg">{message}</h4>
        <p className="text-center">{submessage}</p>

        <div className="flex justify-center gap-2">
            <button 
                className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                onClick={() => setConfirmationPanel(null)}
            >
                Cancel
            </button>
            <button 
                className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                onClick={handler}
            >
                {buttonText}
            </button>
        </div>
    </div>
}