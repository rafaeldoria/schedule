interface ButtonAuthProps {
    text: string;
  }

export default function ButtonAuth({text}: ButtonAuthProps) {
    return (
        <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700
                    focus:bg-indigo-700 duration-300 text-white rounded-lg px-3 py-3 font-semibold"
                >
                    {text}
                </button>
            </div>
        </div>
    )
};
