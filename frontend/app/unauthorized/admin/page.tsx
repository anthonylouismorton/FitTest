import Link from "next/link"

export default function AdminDenied() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <h1 className="text-5xl">Access Denied</h1>
            <p className="text-3xl max-w-2xl text-center">Only admins may access this page.
            </p>
            <Link href="/" className="text-3xl underline">Return to Home Page</Link>
        </div>
    )
}