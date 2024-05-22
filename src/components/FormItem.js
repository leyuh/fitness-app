export default function FormItem ({ title, state, setState, type="text" }) {
    return (
        <div className="md:grid flex-col items-center my-4 md:grid-cols-[30%_70%]">
            <h2 className="w-40 text-primary text-sm md:text-lg font-bold capitalize">{title}</h2>
            <input
                type={type}
                id={title}
                placeholder={title}
                value={state}
                onChange={e => setState(e.target.value)}
                className="rounded-sm py-1 px-2 text-md md:text-lg w-full mt-2 md:mt-auto"
            />
        </div>
    )
}
