import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@heroicons/react/24/solid'

export type option = {
    value: string
    label: string
}

type TransactionFilterProps = {
    title: string
    options: option[]
    selectedOptions: option[]
    onFilterChange: (value: option[]) => void
}

const TransactionFilter = ({
    title,
    options,
    selectedOptions,
    onFilterChange,
}: TransactionFilterProps) => {
    const handleSelect = (selectedValue: string) => {
        let updatedSelectedOptions
        const isSelected = selectedOptions.some(
            (option) => option.value === selectedValue
        )

        if (isSelected) {
            updatedSelectedOptions = selectedOptions.filter(
                (option) => option.value !== selectedValue
            )
        } else {
            const selectedOption = options.find(
                (option) => option.value === selectedValue
            )
            if (selectedOption) {
                updatedSelectedOptions = [...selectedOptions, selectedOption]
            } else {
                updatedSelectedOptions = selectedOptions
            }
        }

        onFilterChange(updatedSelectedOptions)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="border-dashed gap-2.5 hover:bg-gray-200 hover:text-secondary"
                >
                    <AdjustmentsHorizontalIcon className="size-4"></AdjustmentsHorizontalIcon>
                    {title}
                    {selectedOptions.length > 0 && (
                        <>
                            <div className="flex space-x-1">
                                {selectedOptions.map((option) => (
                                    <Badge
                                        variant="secondary"
                                        key={option.value}
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {option.label}
                                    </Badge>
                                ))}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No Results Found</CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedOptions
                                    .map(({ value }) => value)
                                    .includes(option.value)

                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() =>
                                            handleSelect(option.value)
                                        }
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex size-4 items-center justify-center border border-grayMedium',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50'
                                            )}
                                        >
                                            {isSelected ? (
                                                <CheckIcon className="size-4" />
                                            ) : null}
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>

                        {selectedOptions.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => onFilterChange([])}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default TransactionFilter
