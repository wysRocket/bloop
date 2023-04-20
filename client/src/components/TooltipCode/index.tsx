import React, { useCallback, useEffect, useState } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import Code from '../CodeBlock/Code';
import BreadcrumbsPath from '../BreadcrumbsPath';
import { TokenInfoResponse } from '../../types/api';
import Button from '../Button';
import Sparkle from '../../icons/Sparkle';
import SkeletonItem from '../SkeletonItem';
import Badge from './Badge';

type Props = {
  language: string;
  data?: TokenInfoResponse;
  position: 'left' | 'center' | 'right';
  children: React.ReactNode;
  onHover: () => void;
  repoName: string;
  queryParams: string;
  onRefDefClick: (lineNum: number, filePath: string) => void;
  isLoading: boolean;
};

export enum Type {
  REF = 'ref',
  DEF = 'def',
  MOD = 'mod',
  RET = 'ret',
}

const colorMap = {
  ref: 'text-danger-400',
  def: 'text-success-400',
  mod: 'text-violet-400',
  ret: 'text-sky-500',
};

const positionMapping = {
  left: '-start',
  right: '-end',
  center: '',
};

const positionMap = {
  left: { tail: 'left-1', fixBorder: 'left-[8.38px]' },
  center: {
    tail: 'left-1/2 -translate-x-1/2',
    fixBorder: 'left-[13px] left-1/2 -translate-x-1/2 transform',
  },
  right: { tail: 'right-2', fixBorder: 'right-[12.3px]' },
};

const tailStyles = {
  top: {
    tail: 'bg-gray-700 top-2',
    fixture: 'border-b-[1px] top-[10px]',
  },
  bottom: {
    tail: 'bg-gray-800 bottom-2',
    fixture: 'border-t-[1px] border-gray-800 bottom-[10px]',
  },
};

let prevEventSource: EventSource;

const TooltipCode = ({
  data,
  position,
  language,
  children,
  onHover,
  repoName,
  onRefDefClick,
  queryParams,
  isLoading,
}: Props) => {
  const [filters, setFilters] = useState<Type[]>([
    Type.REF,
    Type.DEF,
    Type.MOD,
    Type.RET,
  ]);
  const [isExplanationOpen, setExplanationOpen] = useState(false);
  const [explanation, setExplanation] = useState('');

  const toggleFilter = useCallback((type: Type) => {
    setFilters((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  }, []);

  const onExplain = useCallback(() => {
    setExplanationOpen(true);
    if (explanation) {
      return;
    }
    prevEventSource?.close();
    prevEventSource = new EventSource(
      `http://localhost:7878/api/trace?${queryParams}`,
    );
    prevEventSource.onmessage = (resp) => {
      console.log(resp.data);
      if (resp.data === '[DONE]') {
        prevEventSource.close();
        return;
      }
      const data = JSON.parse(resp.data);
      if (data.Ok) {
        setExplanation((prev) => prev + data.Ok);
      }
    };
    prevEventSource.onerror = console.log;
  }, []);

  useEffect(() => {
    return () => {
      prevEventSource?.close();
    };
  }, []);

  const getTailPosition = (
    placement: TippyProps['placement'],
  ): {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'bottom' | 'top';
  } => {
    return {
      horizontal: placement?.endsWith('start')
        ? 'left'
        : placement?.endsWith('end')
        ? 'right'
        : 'center',
      vertical: placement?.startsWith('top') ? 'bottom' : 'top',
    };
  };

  const renderTooltip = (attrs: {
    'data-placement': TippyProps['placement'];
  }) => {
    if (!data?.length && !isLoading) {
      return '';
    }
    const tailPosition = getTailPosition(attrs['data-placement']);

    return (
      <div className="relative py-[10px] w-fit" {...attrs}>
        <span
          className={`absolute ${
            positionMap[tailPosition.horizontal].tail
          } w-5 h-5 border border-gray-600 ${
            tailStyles[tailPosition.vertical].tail
          } transform rotate-45 box-border z-[-1] rounded-sm`}
        />

        <div className="flex flex-col w-96 rounded border border-gray-600 z-10 bg-gray-800 backdrop-blur-6">
          <span
            className={`absolute ${
              positionMap[tailPosition.horizontal].fixBorder
            } w-[11.52px] h-[1px] bg-gray-700 ${
              tailStyles[tailPosition.vertical].fixture
            } border-l-[1px] border-r-[1px] border-b-transparent border-l-gray-600 border-r-gray-600`}
          />
          <div className="bg-gray-700/50 px-3 py-2 rounded-t border-b border-gray-700 flex items-center justify-between gap-2">
            {isLoading ? (
              <div className="w-full h-6 my-1">
                <SkeletonItem />
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <Badge
                    type={Type.DEF}
                    onClick={toggleFilter}
                    active={filters.includes(Type.DEF)}
                    disabled={
                      !data?.some((d) =>
                        d.data.some((dd) => dd.kind.startsWith(Type.DEF)),
                      )
                    }
                    tooltipText="The line of code where identifier is defined"
                  />
                  <Badge
                    type={Type.REF}
                    onClick={toggleFilter}
                    active={filters.includes(Type.REF)}
                    disabled={
                      !data?.some((d) =>
                        d.data.some((dd) => dd.kind.startsWith(Type.REF)),
                      )
                    }
                    tooltipText="The line of code where the identifier is referenced"
                  />
                  <Badge
                    type={Type.MOD}
                    onClick={toggleFilter}
                    active={filters.includes(Type.MOD)}
                    disabled={
                      !data?.some((d) =>
                        d.data.some((dd) => dd.kind.startsWith(Type.MOD)),
                      )
                    }
                    tooltipText="The line of code where the identifier is modified"
                  />
                  <Badge
                    type={Type.RET}
                    onClick={toggleFilter}
                    active={filters.includes(Type.RET)}
                    disabled={
                      !data?.some((d) =>
                        d.data.some((dd) => dd.kind.startsWith(Type.RET)),
                      )
                    }
                    tooltipText="The line of code where the identifier is returned"
                  />
                </div>
                {/*{!isExplanationOpen && (*/}
                {/*  <Button size="tiny" onClick={onExplain} disabled>*/}
                {/*    <span className="w-4 h-4 inline-block">*/}
                {/*      <Sparkle raw />*/}
                {/*    </span>*/}
                {/*    Explain*/}
                {/*  </Button>*/}
                {/*)}*/}
              </>
            )}
          </div>

          {isExplanationOpen && !isLoading && (
            <div className="bg-gray-700 py-2 px-3 body-s">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">bloop</span>
                <button
                  className="text-primary-300"
                  onClick={() => setExplanationOpen(false)}
                >
                  Hide
                </button>
              </div>
              <p className="text-gray-50">{explanation}</p>
            </div>
          )}
          <span className="overflow-auto max-h-80">
            {!isLoading &&
              data?.length &&
              data
                .filter(
                  (d) =>
                    d.data.filter((dd) =>
                      filters.includes(dd.kind.slice(0, 3) as Type),
                    ).length,
                )
                .map((d, i) => (
                  <div className="border-b border-gray-700" key={d.file + i}>
                    <div className="px-3 pt-2">
                      <BreadcrumbsPath
                        path={d.file}
                        repo={repoName}
                        activeStyle="secondary"
                      />
                    </div>
                    {d.data
                      .filter((dd) =>
                        filters.includes(dd.kind.slice(0, 3) as Type),
                      )
                      .map((line, i) => (
                        <div
                          key={i}
                          className="py-2 px-3 code-s flex gap-1 cursor-pointer overflow-auto"
                          onClick={() =>
                            onRefDefClick(line.snippet.line_range.start, d.file)
                          }
                        >
                          <div
                            className={`uppercase caption w-8 flex-shrink-0 flex-grow-0 ${
                              colorMap[line.kind.slice(0, 3) as Type]
                            }`}
                          >
                            {line.kind.slice(0, 3)}
                          </div>
                          <Code
                            code={line.snippet.data.trim()}
                            lineStart={line.snippet.line_range.start}
                            language={language}
                            removePaddings
                            lineHoverEffect
                          />
                        </div>
                      ))}
                  </div>
                ))}
            {isLoading && (
              <div className="w-1/2 h-7 pt-2 px-3">
                <SkeletonItem />
              </div>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Tippy
      placement={
        `bottom${positionMapping[position]}` as TippyProps['placement']
      }
      interactive
      trigger="click"
      appendTo={(ref) => ref.ownerDocument.body}
      onShow={onHover}
      render={renderTooltip}
    >
      <span className={'cursor-pointer'}>{children}</span>
    </Tippy>
  );
};

export default TooltipCode;
