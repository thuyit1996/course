'use client';
import { changePassword } from '@/api/auth/fetches';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../ui/button/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const FORM_DEFAULT_VALUE= {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

export default function ChangePasswordModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState(FORM_DEFAULT_VALUE);
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const isValid =
    form.newPassword.length >= 8 &&
    /[A-Z]/.test(form.newPassword) &&
    /[0-9]/.test(form.newPassword) &&
    form.newPassword === form.confirmPassword;

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleVisibility = (field: keyof typeof show) => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      const result = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      });

      if (result.responseData?.error) {
        toast.error(result.responseData?.error?.message ?? 'Failed to change password.')
      } else {
        toast.success('Password changed successfully!')
        setForm(FORM_DEFAULT_VALUE);
        onClose();
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error);
    } finally {
      setLoading(false);

    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center modal z-99999">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <span style={{ fontSize: '20px' }}>X</span>
        </button>

        <h2 className="text-xl font-bold mb-6">Change Password</h2>

        {/* Old Password */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Old Password</label>
        <div className="relative mb-4">
          <input
            type={show.old ? 'text' : 'password'}
            placeholder="Enter your old password"
            value={form.oldPassword}
            onChange={e => handleChange('oldPassword', e.target.value)}
            className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => toggleVisibility('old')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show.old ? (
              <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
            ) : (
              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
            )}
          </button>
        </div>

        {/* New Password */}
        <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
        <p className="text-xs text-gray-500 mb-1">Minimum 8 characters. Must contain 1 uppercase letter and 1 number.</p>
        <div className="relative mb-4">
          <input
            type={show.new ? 'text' : 'password'}
            placeholder="Enter your new password"
            value={form.newPassword}
            onChange={e => handleChange('newPassword', e.target.value)}
            className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => toggleVisibility('new')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show.new ? (
              <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
            ) : (
              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative mb-6">
          <input
            type={show.confirm ? 'text' : 'password'}
            placeholder="Enter your confirm password"
            value={form.confirmPassword}
            onChange={e => handleChange('confirmPassword', e.target.value)}
            className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => toggleVisibility('confirm')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show.confirm ? (
              <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
            ) : (
              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
            )}
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <Button size="md"  variant="outline" onClick={onClose}>
            {'Cancel'}
          </Button>
          <Button onClick={handleSubmit}
            disabled={!isValid || loading} size="sm">
            {loading ? 'Saving...' : 'Change'}
          </Button>
        </div>
      </div>
    </div>
  );
}
