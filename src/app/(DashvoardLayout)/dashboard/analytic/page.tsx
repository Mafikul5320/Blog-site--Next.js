import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Anatytic() {
    return (
        <div className="space-x-5">

            <Link href={"/dashboard/analytic/weekly"}><Button>Weekly</Button></Link>
            <Link href={"/dashboard/analytic/monthly"}><Button>Monthly</Button></Link>
        </div>
    )
}