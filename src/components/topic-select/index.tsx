'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, CheckCircle, Circle } from 'lucide-react';
import clsx from 'clsx';
import AddTopic from '../add-topic';
import { useModal } from '@/hooks/useModal';
import { Topic } from '@/types/admin';

type Option = {
  id: string;
  name: string;
};

type BaseProps = {
  options: Option[];
  placeholder?: string;
  className?: string;
  toggle?: () => void;
  name: string;
};

type SingleSelectProps = BaseProps & {
  mode: "single";
  defaultValue?: string;
  onChange: (value: string) => void;
};

type MultipleSelectProps = BaseProps & {
  mode: "multiple";
  defaultValue?: string[];
  onChange: (value: string[]) => void;
};

type SelectProps = SingleSelectProps | MultipleSelectProps;

type SortOption = 'selected' | 'az' | 'za';

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Selected First', value: 'selected' },
  { label: 'A → Z', value: 'az' },
  { label: 'Z → A', value: 'za' },
];


export default function TopicSelect({ options, placeholder, name, mode, onChange, className, defaultValue, toggle }: SelectProps) {
  const { isOpen, closeModal, openModal } = useModal();

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('selected');
  const [topics, setTopics] = useState<Option[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpenSelect(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onChangeSelect = (id: string) => {
    if (mode === 'single') {
      setSelected([id]);
      // TODO: ? work around for fix missing topicId
      onChange(id);
    } else {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  const getSortedOptions = () => {
    let filtered = topics.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'selected') {
      return [...filtered].sort((a, b) => {
        const aSel = selected.includes(a.id);
        const bSel = selected.includes(b.id);
        return aSel === bSel ? 0 : aSel ? -1 : 1;
      });
    }
    if (sort === 'az') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  };

  const onSuccessTopic = (topic: Topic) => {
    setTopics([topic, ...topics])
  }

  useEffect(() => {
    setTopics(options)
  }, [options])

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        onClick={() => setIsOpenSelect(!isOpenSelect)}
        className="text-left bg-white flex items-center justify-between text-sm h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400 bg-gray-50"
      >
        <span className={clsx('truncate', selected.length ? 'text-black' : 'text-gray-400')}>
          {selected.length === 0
            ? placeholder ?? 'Search options or add your own'
            : mode === 'single' ? topics.find(value => selected.includes(value.id))?.name :
              `${selected.length} option${selected.length > 1 ? 's' : ''} selected`
          }
        </span>
        <ChevronDown size={18} className="text-gray-500" />
      </button>

      {isOpenSelect && (
        <div className="absolute z-50 bg-white border shadow-lg mt-2 w-full rounded-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none  bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
            />
            <div className="relative">
              <button
                className="border rounded p-2 text-gray-500 hover:bg-gray-100"
                onClick={() => setFilterOpen(prev => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4h18M3 12h12m-12 8h6"
                  />
                </svg>
              </button>
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded p-3 z-50">
                  <p className="text-sm text-gray-500 mb-2">Sort</p>
                  <div className="flex flex-col space-y-2">
                    <fieldset >
                      {sortOptions.map((option, index) => (
                        <label key={index} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={'topics-filter'}
                            value={option.value}
                            checked={option.value === sort}
                            // onChange={() => console.log}
                            onClick={() => {
                              setSort(option.value);
                              // setFilterOpen(false);
                            }}
                            className="form-radio text-red-600"
                            style={{ boxShadow: 'none' }}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}

                    </fieldset>
                  </div>

                </div>
              )}
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {getSortedOptions().map(option => (
              <label
                key={option.id}
                className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded"
              >
                <input
                  className="form-radio text-red-600"
                  style={{ boxShadow: 'none' }}
                  type={mode === 'single' ? "radio" : "checkbox"}
                  name={name ?? 'options-filter'}
                  checked={selected.includes(option.id)}
                  onChange={() => onChangeSelect(option.id)}
                />
                <span className="text-sm text-gray-800">{option.name}</span>
              </label>
            ))}
          </div>

          {/* <div className="flex justify-between mt-4">
            <button
              onClick={() => setSelected([])}
              className="text-sm text-gray-600 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={() => setIsOpenSelect(false)}
              className="text-sm bg-pink-100 text-pink-700 rounded px-4 py-2 hover:bg-pink-200"
            >
              Apply
            </button>
          </div> */}

          <button className="w-full mt-3 py-2 text-sm text-blue-600 border-t pt-2 flex items-center justify-center gap-1 hover:underline" onClick={openModal}>
            <span>＋ Create New Topic</span>
          </button>
        </div>
      )}
      {
        isOpen && <AddTopic closeModal={closeModal} isOpen={isOpen} onSuccess={onSuccessTopic} />
      }
    </div>
  );
}
