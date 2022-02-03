import {
  GuildMember,
  useGuildMembers,
} from "../../hooks/useGuildMembers/useGuildMembers";
import ReviewersTable from "../../presentation-components/ReviewersTable/ReviewersTable";

export const ReviewersTableContainer = () => {
  const { guildMembers } = useGuildMembers();

  const weekCount = getNumberOfCurrentWeek();
  const reviewShiftIndex = getShiftOfTable(weekCount, guildMembers.length);
  const tableMembers = guildMembersToTableMembers(
    guildMembers,
    reviewShiftIndex
  );

  return (
    <div>
      <h2>{reviewShiftIndex}</h2>

      <ReviewersTable members={tableMembers} />
    </div>
  );
};

function getShiftOfTable(weekCount: number, membersCount: number) {
  return (Math.ceil(weekCount / 2) - 1) % membersCount;
}

function getNumberOfCurrentWeek() {
  const currentDay = new Date();
  const startDate = new Date(2022, 0, 10);
  const millisecsInDay = 86400000;
  console.log("curDay", currentDay);
  console.log("startDay", startDate.getTime());
  console.log(millisecsInDay);

  return Math.ceil(
    ((currentDay.getTime() - startDate.getTime()) / millisecsInDay + 1) / 7
  );
}

function guildMembersToTableMembers(
  guildMembers: GuildMember[],
  reviewShiftIndex: number
) {
  return [...guildMembers]
    .sort((a, b) => a.order - b.order)
    .map((m, index, sortedGuildMembers) => {
      return {
        name: m.tableName,
        reviewingMembersNames: getReviewingMembersName(
          sortedGuildMembers,
          m.order,
          reviewShiftIndex
        ),
      };
    });
}

function getReviewingMembersName(
  guildMembers: GuildMember[],
  order: number,
  reviewShiftIndex: number
) {
  const nextReviewerOrder =
    (order + 1 + reviewShiftIndex) % guildMembers.length || guildMembers.length;
  const secondNextReviewerOrder =
    (order + 2 + reviewShiftIndex) % guildMembers.length || guildMembers.length;

  console.log("guildMembers", guildMembers);
  console.log("next", nextReviewerOrder);
  console.log("second-next", secondNextReviewerOrder);

  return [
    guildMembers.find((m) => m.order === nextReviewerOrder)!.tableName,
    guildMembers.find((m) => m.order === secondNextReviewerOrder)!.tableName,
  ];
}
