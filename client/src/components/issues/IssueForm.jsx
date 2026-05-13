import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { issueSchema } from '../../utils/validation';
import ErrorMessage from '../common/ErrorMessage';
import Spinner from '../common/Spinner';

const IssueForm = ({ onSubmit, defaultValues, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter issue title"
          {...register('title')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              id="description"
              placeholder="Describe the issue (Markdown supported)"
              {...field}
            />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      {/* Action Buttons */}
      <Flex gap="3" mt="4">
        <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
          {isSubmitting ? <Spinner size="sm" /> : defaultValues ? 'Update Issue' : 'Create Issue'}
        </Button>
        <Button
          type="button"
          variant="soft"
          color="gray"
          onClick={() => window.history.back()}
          className="cursor-pointer"
        >
          Cancel
        </Button>
      </Flex>
    </form>
  );
};

export default IssueForm;
