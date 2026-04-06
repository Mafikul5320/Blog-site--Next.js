import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function layout({ children, marketingSlot, salesSlot }: {
    children: React.ReactNode
    marketingSlot: React.ReactNode
    salesSlot: React.ReactNode

}) {
    return (
        <div>
            <div className="flex space-x-3">
                <Link href={'/development'}><Button>Developement</Button></Link>
                <Link href={'/marketing'}><Button>Mareting</Button></Link>
                <Link href={'/marketing/setting'}><Button>setting</Button></Link>
                <Link href={'/sales'}><Button>Sals</Button></Link>
            </div>

            <div className="flex gap-2">
                {marketingSlot}
                {salesSlot}
            </div>

            {children}

        </div>
    )
}