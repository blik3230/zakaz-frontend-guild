import {
  GuildMember,
  useGuildMembers,
} from "../../hooks/useGuildMembers/useGuildMembers";
import ReviewersTable, {
  TableMember,
} from "../../presentation-components/ReviewersTable/ReviewersTable";
import styles from "./ReviewersTableContainer.styles";

export const ReviewersTableContainer = () => {
  const { guildMembers } = useGuildMembers();
  const weekCount = getNumberOfCurrentWeek();

  const reviewShiftIndex = getShiftOfTable(weekCount, guildMembers.length - 1);

  const tableMembers = guildMembersToTableMembers(
    guildMembers,
    reviewShiftIndex
  );

  const handleMemberClick = (memberName: TableMember["name"]) => {
    console.log(memberName);
  };

  return (
    <div className="ReviewersTableContainer">
      <h1>Таблица ревьюверов</h1>

      <ReviewersTable
        members={tableMembers}
        onMemberClick={handleMemberClick}
      />
      <style jsx>{styles}</style>
    </div>
  );
};

function getShiftOfTable(weekCount: number, membersCount: number) {
  return (Math.ceil(weekCount / 2) - 1) % membersCount;
}

function getNumberOfCurrentWeek(day = new Date()) {
  const startDate = new Date(2022, 0, 10);
  const millisecondsInDay = 86400000;

  return Math.ceil(
    ((day.getTime() - startDate.getTime()) / millisecondsInDay + 1) / 7
  );
}

function guildMembersToTableMembers(
  guildMembers: GuildMember[],
  reviewShiftIndex: number
) {
  return guildMembers.map((m, index, sortedGuildMembers) => {
    return {
      name: m.tableName,
      reviewingMembersNames: getReviewingMembersName(
        sortedGuildMembers.filter((i) => i.name !== m.name),
        index,
        reviewShiftIndex
      ),
    };
  });
}

function getReviewingMembersName(
  reviewersMembers: GuildMember[],
  index: number,
  reviewShiftIndex: number
) {
  const nextReviewerIndex =
    (index + 1 + reviewShiftIndex - 1) /* - 1 грубое обнуление моего индекса*/ %
    reviewersMembers.length;
  const secondNextReviewerIndex =
    (index + 2 + reviewShiftIndex - 1) % reviewersMembers.length;
  console.log("nextReviewerIndex", nextReviewerIndex);
  console.log("reviewersMembers", reviewersMembers);
  return [
    reviewersMembers[nextReviewerIndex]!.tableName,
    reviewersMembers[secondNextReviewerIndex]!.tableName,
  ];
}
