import React, { useEffect, useState } from "react";
import Tetramino from "components/tetramino";
import Title from "components/titles";
import Activity from "components/activity";
import HorizontalScroll from "components/horizontalScroll";
import moment from "moment";

import "./schedules.scss";
import {
  refreshTetraminos,
  todayTetraminos,
  tomorrowTetraminos,
} from "utils/store/slices/tetraminosSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Schedule() {
  const activities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return { title: "Placeholder" };
  });
  const todayTetraminosStore = useSelector(todayTetraminos);
  const tomorrowTetraminosStore = useSelector(tomorrowTetraminos);

  const [currentTetramino, setCurrentTetramino] = useState([]);
  const [previousTetramino, setPreviousTetramino] = useState([]);
  const [nextTetramino, setNextTetramino] = useState([]);

  const disptatch = useDispatch();

  const isInProgress = (start, end) => {
    const format = "HH:mm";

    const requestedStart = moment(start, format);
    const requestedEnd = moment(end, format);

    return moment().isBetween(requestedStart, requestedEnd);
  };

  useEffect(() => {
    refreshTetraminos(disptatch);
  }, []);

  useEffect(() => {
    let currentTetraminoIndex = 0;
    let currentTetramino = todayTetraminosStore.filter(
      ({ start_hour, end_hour }, index) => {
        currentTetraminoIndex = isInProgress(start_hour, end_hour)
          ? index
          : currentTetraminoIndex;
        return isInProgress(start_hour, end_hour);
      }
    );
    if (currentTetraminoIndex !== 0) {
      setCurrentTetramino(currentTetramino);
      if (todayTetraminosStore[currentTetraminoIndex - 1] != null) {
        setPreviousTetramino([todayTetraminosStore[currentTetraminoIndex - 1]]);
      }

      if (
        todayTetraminosStore[currentTetraminoIndex + 1] != null &&
        currentTetraminoIndex !== 0
      ) {
        setNextTetramino([todayTetraminosStore[currentTetraminoIndex + 1]]);
      }
    } else {

    }
  }, [todayTetraminosStore]);

  return (
    <div className="main">
      <div className="main-schedule-section">
        {previousTetramino.length >= 1 ? (
          previousTetramino.map(
            ({ title, start_hour, end_hour, _id }, index) => (
              <div className="previous">
                <Title
                  type="onProgress"
                  tetramineTitle={title}
                  key={`${_id}_previuos_title`}
                />
                <Tetramino
                  title={title}
                  start={start_hour}
                  end={end_hour}
                  id={_id}
                  key={`${_id}_previuos`}
                />
              </div>
            )
          )
        ) : (
          <Title
            type="onProgress"
            tetramineTitle="Parece que no hay nada aqui..."
          />
        )}
        {currentTetramino.length >= 1 ? (
          currentTetramino.map(({ title, start_hour, end_hour, _id }) => (
            <div className="current">
              <Title
                type="onProgress"
                tetramineTitle={title}
                current
                large
                key={`${_id}_current_title`}
              />
              <Tetramino
                title={title}
                start={start_hour}
                end={end_hour}
                id={_id}
                key={`${_id}_current`}
                large
              />
            </div>
          ))
        ) : (
          <Title
            type="onProgress"
            tetramineTitle="Parece que no hay nada aqui..."
            current
            large
          />
        )}
        {nextTetramino.length >= 1 ? (
          nextTetramino.map(({ title, start_hour, end_hour, _id }) => (
            <div className="next">
              <Title
                type="onProgress"
                tetramineTitle={title}
                key={`${_id}_next_title`}
                next
              />
              <Tetramino
                title={title}
                start={start_hour}
                end={end_hour}
                id={_id}
                key={`${_id}_next`}
              />
            </div>
          ))
        ) : (
          <div className="next">
            <Title
              type="onProgress"
              tetramineTitle="Parece que no hay nada aqui..."
              next
            />
          </div>
        )}
      </div>
      <div className="activity-section">
        <Title type="activity" />
        <HorizontalScroll thin>
          {activities.map(({ title }, key) => (
            <Activity title={title} key={`${key}_activity`} />
          ))}
        </HorizontalScroll>
      </div>
      <div className="schedule-section">
        <Title type="schedule" today />
        <HorizontalScroll>
          {todayTetraminosStore.length >= 1 ? (
            todayTetraminosStore.map(({ title, start_hour, end_hour, _id }) => (
              <Tetramino
                title={title}
                start={start_hour}
                end={end_hour}
                id={_id}
                key={_id}
              />
            ))
          ) : (
            <Title />
          )}
        </HorizontalScroll>
        <Title type="schedule" />
        <HorizontalScroll>
          {tomorrowTetraminosStore.length >= 1 ? (
            tomorrowTetraminosStore.map(
              ({ title, start_hour, end_hour, _id }) => (
                <Tetramino
                  title={title}
                  start={start_hour}
                  end={end_hour}
                  id={_id}
                  key={_id}
                />
              )
            )
          ) : (
            <Title />
          )}
        </HorizontalScroll>
      </div>
    </div>
  );
}
