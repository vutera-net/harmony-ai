import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@harmony/database'
import { TuViForm } from '@/components/tuvi/TuViForm'

export const metadata: Metadata = {
  title: 'Lập Lá Số Tử Vi Đẩu Số',
  description:
    'Lập lá số Tử Vi Đẩu Số đầy đủ với 14 chính tinh, 12 cung và Đại Vận. Giải nghĩa chi tiết từng cung, từng sao.',
}

export default async function TuViPage() {
  const session = await auth()
  let userTier: string | undefined

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { plan: true, endDate: true, status: true },
        },
      },
    })
    if (user?.subscriptions[0]) {
      const sub = user.subscriptions[0]
      const isExpired = sub.endDate && sub.endDate < new Date()
      const planMap: Record<string, string> = { FREE: 'free', AN_NHIEN: 'premium', BINH_AN: 'vip' }
      userTier = sub.status === 'ACTIVE' && !isExpired ? (planMap[sub.plan] ?? 'free') : 'free'
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Lá Số Tử Vi Đẩu Số</h1>
        <p className="mt-2 text-gray-600">
          Nhập thông tin để lập lá số Tử Vi với 14 chính tinh, 12 cung đầy đủ
        </p>
        <Link
          href="/so-sanh-la-so"
          className="mt-3 inline-block rounded-full border px-4 py-1.5 text-sm font-medium transition hover:bg-red-50"
          style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
        >
          ☯ So sánh 2 lá số →
        </Link>
      </div>
      <TuViForm userTier={userTier} />
    </div>
  )
}
