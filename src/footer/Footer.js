import React from "react";
import { Link } from "@nextui-org/react";
import "./Footer.css";

function FooterComponent() {
    return (
        <div className="p-4 footer-container">
            <div className="text-tiny ">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
            <div className="text-tiny ">
                <Link href="https://github.com/your-github-username" target="_blank" className="text-tiny " variant="flat" color="foreground" radius="lg" size="sm">
                    Github
                </Link>
            </div>
        </div>
        

    );
}

export default FooterComponent;