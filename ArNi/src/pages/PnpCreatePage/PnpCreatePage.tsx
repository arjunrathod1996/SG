import React from "react";
import { Link } from "react-router-dom";

const PnpCreatePageComponent: React.FunctionComponent = props => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/pnp/home">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente minima sint officia totam deserunt, ea quo maiores magni facere quidem accusantium, vero voluptatibus perferendis esse sequi, quasi similique harum optio nostrum non corrupti quisquam ex. Cum, at sit rem facilis alias recusandae, veritatis eos consequatur commodi officiis ipsum omnis officia!
                        </Link>
                    </li>
                </ol>
            </nav>
        </div>
    )
};

export default PnpCreatePageComponent;