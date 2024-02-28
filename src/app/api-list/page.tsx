import { db } from '@/lib/firebase/firebaseConfig';
import {
  CollectionReference,
  collection,
  getDocs,
  query,
} from 'firebase/firestore';

export interface IApiDocument {
  description: string;
  name: string;
  title: string;
  url: string;
}

export default async function ApiListPage() {
  if (!db) {
    return;
  }

  const apiRef = query(
    collection(db, 'api')
  ) as CollectionReference<IApiDocument>;

  const apiSnapshot = await getDocs(apiRef);
  const api = apiSnapshot.docs.map((doc) => doc.data());

  console.error(api);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center">
        {api.map((el) => (
          <div key={el.description}>{el.description}</div>
        ))}
      </div>
    </>
  );
}
