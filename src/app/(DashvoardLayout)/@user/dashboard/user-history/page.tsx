import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BlogService } from "@/services/blog.service"
import { Blog } from "@/types/blog.type";

export default async function History() {
    const blog = await BlogService.getBlogPost();
    console.log(blog)
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>content</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="border rounded-5xl">
                
                {blog.data.result.map((b: Blog) => <TableRow>
                    <TableCell className="font-medium">{b.title}</TableCell>
                    <TableCell>{b.content}</TableCell>
                    <TableCell>{b.tag}</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    )
}