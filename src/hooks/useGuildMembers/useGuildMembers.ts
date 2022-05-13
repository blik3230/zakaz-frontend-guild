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
    name: "Sem",
    tableName: "Sem",
  },
  {
    id: "3",
    order: 3,
    name: "Roh",
    tableName: "Roh",
  },
  {
    id: "4",
    order: 4,
    name: "Kar",
    tableName: "Kar",
  },
  {
    id: "5",
    order: 5,
    name: "Chu",
    tableName: "Chu",
  },
];

export const useGuildMembers = () => {
  const [guildMembers, setGuildMembers] =
    useState<GuildMember[]>(guildMembersMock);

  return { guildMembers };
};
