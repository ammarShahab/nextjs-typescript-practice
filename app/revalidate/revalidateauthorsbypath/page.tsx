import { Authors } from "@/app/lib/models/Author";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import Link from "next/link";

export async function onRevalidatePath() {
  "use server";
  revalidatePath("/revalidate/revalidateauthorsbypath");
}

export async function onRevalidateTag() {
  "use server";
  const tag = "revalidateauthorsbypath";
  revalidateTag(tag, "max");
  updateTag(tag);
}

export default async function RevalidateAuthorsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidateauthors`,
    {
      cache: "force-cache",
      next: {
        tags: ["revalidateauthorsbypath"],
      },
    },
  );

  if (!res.ok) {
    throw new Error("Author Fetching Failed");
  }

  const authors: Authors[] = await res.json();
  console.log(authors);

  return (
    <div>
      <h3>Revalidate Authors Page</h3>
      <div className="flex gap-2">
        <button className="bg-amber-300 rounded-xl p-1.5">
          <Link href="/revalidate/revalidateauthorsbypath/new">
            Create Authors
          </Link>
        </button>
        <form action={onRevalidatePath}>
          <button className="bg-amber-300 rounded-xl p-1.5">
            Revalidate Path
          </button>
        </form>
        <form action={onRevalidateTag}>
          <button className="bg-amber-300 rounded-xl p-1.5">
            Revalidate Tag
          </button>
        </form>
      </div>

      <div className="max-w-[720px] mx-auto mt-5">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-600 bg-slate-700">
                  <p className="text-sm font-normal leading-none text-slate-300">
                    Author Name
                  </p>
                </th>

                <th className="p-4 border-b border-slate-600 bg-slate-700">
                  <p className="text-sm font-normal leading-none text-slate-300">
                    Birth Year
                  </p>
                </th>
                <th className="p-4 border-b border-slate-600 bg-slate-700">
                  <p className="text-sm font-normal leading-none text-slate-300">
                    Categories
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={index + 1} className="hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700 bg-slate-900">
                    <p className="text-sm text-slate-100 font-semibold">
                      {author.author_Name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700 bg-slate-800">
                    <p className="text-sm text-slate-300">
                      {author.birth_year}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700 bg-slate-900">
                    <p className="text-sm text-slate-300">
                      {author.categories.map(
                        (category: string, index: number) => (
                          <span key={index + 1}>{category},</span>
                        ),
                      )}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
