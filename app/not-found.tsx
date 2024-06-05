import { Frame } from "@/components/basic/frame/frame";
import { Heading } from "@/components/basic/heading/heading";

export default function NotFound() {

    return (
        <html>
            <body>
                <Frame>
                    <Heading variant="h1" customTx="404" />
                </Frame>
            </body>
        </html>
    )
}