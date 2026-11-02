"use client";

import { useEffect, useMemo, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

type SplitFlapBoardProps = {
  text: string;
  reduceMotion?: boolean;
};

function randomChar(exclude?: string) {
  let next = CHARSET[Math.floor(Math.random() * CHARSET.length)];
  while (exclude && next === exclude) {
    next = CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return next;
}

export function SplitFlapBoard({
  text,
  reduceMotion = false,
}: SplitFlapBoardProps) {
  const target = useMemo(() => text.toUpperCase().split(""), [text]);
  const [faces, setFaces] = useState(() =>
    target.map((char) => ({
      current: reduceMotion ? char : randomChar(char),
      next: char,
      flipping: false,
    })),
  );
  const [still, setStill] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setFaces(target.map((char) => ({ current: char, next: char, flipping: false })));
      setStill(true);
      return;
    }

    setStill(false);
    setFaces(
      target.map((char) => ({
        current: randomChar(char),
        next: char,
        flipping: false,
      })),
    );

    const timers: number[] = [];

    target.forEach((char, index) => {
      timers.push(
        window.setTimeout(() => {
          setFaces((prev) =>
            prev.map((face, i) =>
              i === index
                ? { current: face.current, next: char, flipping: true }
                : face,
            ),
          );
        }, 80 + index * 70),
      );

      timers.push(
        window.setTimeout(
          () => {
            setFaces((prev) =>
              prev.map((face, i) =>
                i === index
                  ? { current: char, next: char, flipping: false }
                  : face,
              ),
            );
          },
          80 + index * 70 + 420,
        ),
      );
    });

    timers.push(
      window.setTimeout(
        () => setStill(true),
        80 + target.length * 70 + 500,
      ),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [reduceMotion, target]);

  return (
    <span className="flap" data-still={still ? "true" : "false"}>
      <span className="flap__label">{text}</span>
      <span className="flap__row" aria-hidden="true">
        {faces.map((face, index) => (
          <span className="flap__cell" key={`${target[index]}-${index}`}>
            {face.flipping ? (
              <>
                <span className="flap__face flap__face--out">{face.current}</span>
                <span className="flap__face flap__face--in">{face.next}</span>
              </>
            ) : (
              <span className="flap__face">{face.current}</span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
