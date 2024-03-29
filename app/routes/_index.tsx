import {Link, useLoaderData} from '@remix-run/react';
import { Image } from '@shopify/hydrogen';

export async function loader({context}: any) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export function meta() {
  return [
    {title: 'My store'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}
export default function Index() {
  const {collections}: any = useLoaderData();
  console.log(collections);
  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {collections.nodes.map((collection: any) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
             	<div className="grid gap-4">
                {collection?.image && (
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    crop="center"
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                  {collection.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 5, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
