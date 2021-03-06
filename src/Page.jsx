import React from "react";
import SegmentBoard from "./segmentboard";
import Scoreboard from "./scoreboard";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { groupEmojis, groups } from "./data/segments";
import { allSegments } from "./data/segments";
import * as qs from "query-string";
import { useAccesToken } from "./api";

const dateRangeTitle = {
  all: "Gjennom alle tider",
  year: "I år"
};

const Page = props => {
  const segmentGroupsFromUrl = props.match.params.segmentGroup;
  const firstGroupAsDefault = groups[0];
  const startSegmentGroup = groupEmojis[segmentGroupsFromUrl]
    ? segmentGroupsFromUrl
    : firstGroupAsDefault;

  const [dateRange, setDateRange] = React.useState("all");
  const [segmentGroup, setSegmentGroup] = React.useState(startSegmentGroup);

  const queryParams = qs.parse(props.location.search);

  useAccesToken();

  let urlSegments = [];
  try {
    const res = JSON.parse(queryParams.segments);
    urlSegments = !res.some(isNaN) ? res : [];
  } catch (error) {
    // console.log(error);
  }

  const createSegmentBoard = (segId, ind) => (
    <SegmentBoard
      key={ind}
      club={queryParams.club}
      dateRange={dateRange}
      segmentId={segId}
    />
  );

  const segmentsFromGroup = Object.values(allSegments)
    .filter(seg => seg.groups[segmentGroup])
    .map(x => x.id);

  const currentSegments =
    urlSegments.length > 0 ? urlSegments : segmentsFromGroup;

  const dateRangeDropwdownItems = Object.entries(dateRangeTitle).map(
    ([k, v]) => (
      <Dropdown.Item
        key={k}
        className={styles.dropdown_item}
        onClick={_ => setDateRange(k)}
      >
        {v}
      </Dropdown.Item>
    )
  );

  const mapGroupsToItems = groups =>
    groups.map(group => (
      <Dropdown.Item
        key={group}
        className={styles.dropdown_item}
        onClick={() => setSegmentGroup(group)}
      >
        {group + " " + groupEmojis[group]}
      </Dropdown.Item>
    ));

  const [group1, ...restOfGroups] = Object.keys(groupEmojis);

  return (
    <div>
      <div className={styles.button_row}>
        <DropdownButton
          className={styles.button}
          title={
            "Segmentgruppe : " + segmentGroup + " " + groupEmojis[segmentGroup]
          }
        >
          {mapGroupsToItems([group1])}
          <DropdownDivider className={styles.divider} />
          {mapGroupsToItems(restOfGroups)}
        </DropdownButton>
        <DropdownButton
          className={styles.button}
          title={"Periode : " + dateRangeTitle[dateRange]}
        >
          {dateRangeDropwdownItems}
        </DropdownButton>
      </div>

      <Scoreboard segments={currentSegments} dateRange={dateRange} />

      {currentSegments.map(createSegmentBoard)}
    </div>
  );
};

export default Page;
