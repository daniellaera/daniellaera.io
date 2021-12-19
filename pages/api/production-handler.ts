import deploymentBadgeHandler from 'deployment-badge';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await deploymentBadgeHandler(req, res, {
    deploymentsUrl: 'https://github.com/daniellaera/daniellaera.io/deployments',
    namedLogo: 'vercel',
    env: 'Production'
  });
};

export default handler;
