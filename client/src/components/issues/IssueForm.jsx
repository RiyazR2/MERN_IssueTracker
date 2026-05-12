import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, TextField } from '@radix-ui/themes';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <TextField.Root
          placeholder="Title"
          {...register('title')}
          size="3"
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      <div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description (Markdown supported)"
              {...field}
            />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <Flex gap="3">
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
