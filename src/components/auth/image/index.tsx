import authImg from "@/assets/auth/auth.png"
import Image from "next/image";

export default function ImageAuth() {
    return (
        <div className="hidden md:block w-1/2 bg-indigo-400 py-10 px-10 text-white">
        <Image
            src={authImg}
            alt="Image auth schedule"
            priority
        />
        </div>
    )
};
