export default function FormItem ({ title, state, setState, type="text" }) {
    return (
        <div className="grid items-center my-4 grid-cols-[30%_70%]">
            <h2 className="w-40 text-primary text-md md:text-lg font-bold capitalize">{title}</h2>
            <input
                type={type}
                id={title}
                placeholder={title}
                value={state}
                onChange={e => setState(e.target.value)}
                className="grow rounded-sm py-1 px-2 text-md md:text-lg"
            />
        </div>
    )
}
