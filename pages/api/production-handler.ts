import deploymentBadgeHandler from 'deployment-badge';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await deploymentBadgeHandler(req, res, {
    deploymentsUrl: 'https://daniellaera-io.vercel.app/',
    namedLogo: 'vercel',
    env: 'Production'
  });
};

export default handler;
