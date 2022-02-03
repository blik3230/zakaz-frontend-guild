import { useState } from "react";

export interface GuildMember {
  id: string;
  order: number;
  name: string;
  tableName: string;
}

const guildMembersMock: GuildMember[] = [
  {
    id: "1",
    order: 1,
    name: "She",
    tableName: "She",
  },
  {
    id: "2",
    order: 2,
    name: "Pop",
    tableName: "Pop",
  },
  {
    id: "3",
    order: 3,
    name: "Sem",
    tableName: "Sem",
  },
  {
    id: "4",
    order: 4,
    name: "Roh",
    tableName: "Roh",
  },
  {
    id: "5",
    order: 5,
    name: "Kar",
    tableName: "Kar",
  },
  {
    id: "6",
    order: 6,
    name: "Chu",
    tableName: "Chu",
  },
  {
    id: "7",
    order: 7,
    name: "Bon",
    tableName: "Bon",
  },
];

export const useGuildMembers = () => {
  const [guildMembers, setGuildMembers] =
    useState<GuildMember[]>(guildMembersMock);

  return { guildMembers };
};
