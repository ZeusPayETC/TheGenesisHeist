import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title = 'The Genesis Heist | Mint Comic Book on Ethereum Classic',
  description = 'The Genesis Heist is a blockchain-based comic book adventure, blending Ethereum Classic NFTs with immersive storytelling and puzzles. Mint your copy and join our 6 free comic book giveaways!',
  keywords = 'interactive NFT comic series, blockchain-based comic book adventure, mint comic nft, free NFT comic book giveaway, mintable NFT comic collectibles, nft storytelling, comic nft minting, ethereum classic collectibles, nft comic book, read web3 flipbook comics',
  url = 'https://thegenesisheist.app',
  image = 'https://loud-chocolate-cattle.myfilebase.com/ipfs/QmWy2Mv16CDiXcFJnTxqLWfdEbgKf7bVC54pcKP7HpkgV9/0.png',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={url} />
  </Helmet>
);

export default SEO;
