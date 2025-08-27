import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getUser } from '../../../actions/getUser';
import { Participation } from '@/payload-types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import CourseViewer from './components/CourseViewer';

export default async function ParticipationPage({ params }: { params: { participationId: string } }) {
  const payload = await getPayload({ config: configPromise });

  const { participationId } = params; 

  const user = await getUser();

  let participation: Participation | null = null;

  try {
    const res: Participation = await payload.findByID({
      collection: 'participation', 
      id: participationId,
      overrideAccess: false,
      user: user,
    });

    participation = res;
  } catch (err) {
    console.error(err);
    return notFound();
  }

  if (!participation) {
    return notFound();
  }

  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-300 transition duration-300 ease-in-out hover:text-white"
      >
        <HiArrowLeft className="text-lg" />
        Back to Dashboard
      </Link>

      <CourseViewer participation={participation} />
    </div>
  );
}
