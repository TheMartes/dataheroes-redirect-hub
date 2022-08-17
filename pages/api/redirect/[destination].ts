// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Pairings from "../../../config/pairings";
import { StatusCodes } from "../../../enum/status_codes.enum";

type Redirect = {
  url: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Redirect>
) {
  const redirectTo = req.query.destination;

  if (typeof redirectTo !== "undefined" && typeof redirectTo !== "object") {
    const mappedProperty = Pairings.get(redirectTo);

    if (Pairings.has(redirectTo) && mappedProperty !== undefined) {
      res.redirect(mappedProperty);
    } else {
      res.status(404);
      res.end();
    }
  }

  res.status(StatusCodes.BAD_REQUEST);
  res.end();
}
