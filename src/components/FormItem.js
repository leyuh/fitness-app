export default function FormItem ({ title, state, setState, type="text" }) {
    return (
        <div className="flex items-center my-4">
            <h2 className="w-40 text-primary text-lg font-bold capitalize">{title}</h2>
            <input
                type={type}
                id={title}
                placeholder={title}
                value={state}
                onChange={e => setState(e.target.value)}
                className="grow rounded-sm py-1 px-2"
            />
        </div>
    )
}
