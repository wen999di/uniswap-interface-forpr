import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Text, TouchableArea, useSporeColors } from 'ui/src'
import EyeIcon from 'ui/src/assets/icons/eye.svg'
import { iconSizes } from 'ui/src/theme'
import { AccountType } from 'uniswap/src/features/accounts/types'
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks'

type HeaderContentProps = {
  flowName: string
  setShowViewOnlyModal: Dispatch<SetStateAction<boolean>>
}

export function SendHeader({ flowName, setShowViewOnlyModal }: HeaderContentProps): JSX.Element {
  const colors = useSporeColors()
  const account = useActiveAccountWithThrow()
  const { t } = useTranslation()

  const isViewOnlyWallet = account?.type === AccountType.Readonly

  return (
    <Flex
      row
      alignItems="center"
      justifyContent="space-between"
      mt="$spacing8"
      pb="$spacing16"
      pl="$spacing12"
      pr="$spacing16"
    >
      <Text $short={{ variant: 'subheading2' }} $sm={{ variant: 'subheading1' }}>
        {flowName}
      </Text>
      <Flex row gap="$spacing4">
        {isViewOnlyWallet ? (
          <TouchableArea
            backgroundColor="$surface2"
            borderRadius="$rounded12"
            justifyContent="center"
            px="$spacing8"
            py="$spacing4"
            onPress={(): void => setShowViewOnlyModal(true)}
          >
            <Flex row alignItems="center" gap="$spacing4">
              <EyeIcon color={colors.neutral2.get()} height={iconSizes.icon16} width={iconSizes.icon16} />
              <Text color="$neutral2" variant="buttonLabel2">
                {t('swap.header.viewOnly')}
              </Text>
            </Flex>
          </TouchableArea>
        ) : null}
      </Flex>
    </Flex>
  )
}