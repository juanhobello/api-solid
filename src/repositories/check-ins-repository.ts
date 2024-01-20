import { Prisma, Checkin } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
}
