import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, Sparkles, UserRound, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../services/api';
import { resolveMediaUrl } from '../services/media';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const searchUsers = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/users/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setResults(data);
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value.trim()) {
      setResults([]);
      setLoading(false);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      searchUsers(value);
    }, 240);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleSelect = (userId) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 18px 30px rgba(31, 41, 55, 0.08)'
            : '0 8px 18px rgba(31, 41, 55, 0.04)',
        }}
        className={[
          'flex items-center gap-3 rounded-[24px] border px-4 py-3 transition-colors duration-200',
          focused
            ? 'border-primary/30 bg-white/92'
            : 'border-border/80 bg-white/72',
        ].join(' ')}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-panel text-primary">
          <Search size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="hidden md:block text-[10px] uppercase tracking-[0.22em] font-extrabold text-muted mb-1">
            Find Students
          </p>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => {
              setFocused(true);
              if (query.trim() && results.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder="Search peers, departments, or shared interests"
            autoComplete="off"
            className="w-full bg-transparent outline-none text-sm md:text-[15px] font-bold text-ink placeholder:text-muted/80 min-w-0"
          />
        </div>

        {loading && <Loader2 size={18} className="shrink-0 text-primary animate-spin" />}
        {!loading && query && (
          <button
            onClick={handleClear}
            className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-panel transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-3 overflow-hidden rounded-[28px] border border-border/90 bg-[rgba(255,250,244,0.98)] backdrop-blur-2xl shadow-[0_24px_44px_rgba(31,41,55,0.12)] z-50"
          >
            <div className="px-5 py-4 border-b border-border/70 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] font-extrabold text-muted">Search Results</p>
                <p className="text-sm font-semibold text-ink/76">Jump into profiles and connect faster.</p>
              </div>
              <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Sparkles size={16} />
              </div>
            </div>

            {results.length > 0 ? (
              <ul className="py-2 max-h-80 overflow-y-auto custom-scrollbar">
                {results.map((user, index) => (
                  <motion.li
                    key={user._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <button
                      onClick={() => handleSelect(user._id)}
                      className="w-full px-5 py-3 flex items-center gap-4 text-left hover:bg-panel/90 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-panel ring-1 ring-border/70 shadow-[0_10px_20px_rgba(31,41,55,0.06)] shrink-0">
                        {user.profilePic ? (
                          <img src={resolveMediaUrl(user.profilePic)} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary">
                            <UserRound size={20} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold text-ink truncate">{user.name}</p>
                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted truncate mt-1">
                          {user.department || 'Student'}
                        </p>
                      </div>

                      <span className="hidden sm:inline text-[11px] font-bold text-primary">Open</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="px-8 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-panel text-primary">
                  <Search size={22} />
                </div>
                <p className="text-sm font-extrabold text-ink">No matching students yet</p>
                <p className="text-xs font-medium text-muted mt-2">Try another name, skill, or department keyword.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
