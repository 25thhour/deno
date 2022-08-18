/* WARNING
 * In its current form this script will constantly hammer the requested url.
 * Expect to be rate limited / blocked / banned if you use unwisely!
*/

import { difference } from "https://deno.land/std@0.152.0/datetime/mod.ts";

console.log("Press Ctrl-C to trigger a SIGINT signal");

Deno.addSignalListener("SIGINT", () => {
  console.log(`\nExited after ${i} requests`);
  Deno.exit();
});

const requestUrl = Deno.args[0];
const timeDelta = Deno.args[1];

if (!requestUrl || !timeDelta) {
  console.error(
    `\nMissing arguments. Request url and request delta in ms must be provided.
  e.g. deno run --allow-net time-requests.ts https://www.cloudflare.com 100`,
  );
  Deno.exit(1);
}

console.log(`Logging response durations >${timeDelta}ms`);

let i = 0;
let overTimeDelta = 0;
const iterations = Number(Deno.args[2]);

while ((iterations ? i < iterations : true)) {
  i++;
  const startDate = new Date();
  const futureDate = new Date(startDate.getTime() + Number(timeDelta));

  await fetch(requestUrl, { headers: { "user-agent": "Deno time-requests" } })
    .then((res) => {
      const endDate = new Date();
      const diff = difference(startDate, endDate).milliseconds;
      const status = res.status;
      const headers = Object.fromEntries(res.headers);

      if (endDate > futureDate) {
        overTimeDelta++;
        console.log(
          status,
          headers[`cf-cache-status`],
          startDate,
          endDate,
          diff,
          headers[`cf-ray`],
        );
      }
    });
}

console.log(
  `${
    (overTimeDelta / i) * 100
  }% of requests (${overTimeDelta}/${i}) with response >${timeDelta}ms`,
);

Deno.exit(0);
