export default function EntityContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100">
            {children}
        </div>
    )
}