
import type { IncomingMessage, ServerResponse } from "node:http";
import { ProductService } from "../services/product.service";
import type { IProdcut } from "../types/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");

  const id =
    urlParams && urlParams[1] === "products"
      ? Number(urlParams[2])
      : null;

  console.log(id);

  if (url === "/products" && method === "GET") {
    const products = ProductService();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Prodcuts retived successfully",
        data: products,
      }),
    );

  } else if (method === "GET" && id !== null) {
    const products = ProductService();

    const product = products.find(
      (eachProdcutObject: IProdcut) => eachProdcutObject.id === id
    );

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Prodcuts retived successfully",
        data: product,
      }),
    );

  } else if (method === "POST" && url === "/products") {

    const body = await bodyParser(req);
    console.log(body);

    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Prodcut created successfully",
      }),
    );

  }
};

export default productController;

