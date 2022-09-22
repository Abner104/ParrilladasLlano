import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'r2f1h487',
  dataset: 'production',
  apiVersion: '2022-07-16',
  useCdn: true,
  token:
    'skX5ZEkk9hB2U2MKv1Z8eJjAxkl1hymH9ZQOQrfa19NQgvmHOkQRy4V6nOep9Nn1Kgs1ij2DG4Wdq7yQonApdOpJ88jsmYoVedfSR7fQRtiFJzp14aNXLpJLHZFFeNKZUgPCh270KfGgesaLTMw4T9RxQ1yhljEZXVg6ew51c14rGci2srSx',
});
const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
