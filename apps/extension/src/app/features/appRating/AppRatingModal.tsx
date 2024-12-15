import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Flex, Text, TouchableArea } from 'ui/src'
import { Feedback, LikeSquare, MessageText, X } from 'ui/src/components/icons'
import { IconSizeTokens, zIndices } from 'ui/src/theme'
import { Modal } from 'uniswap/src/components/modals/Modal'
import { uniswapUrls } from 'uniswap/src/constants/urls'
import { ModalName } from 'uniswap/src/features/telemetry/constants'
import { useTranslation } from 'uniswap/src/i18n'
import { setAppRating } from 'wallet/src/features/wallet/slice'

interface AppRatingModalProps {
  onClose: () => void
}

enum State {
  Initial,
  NotReally,
  Yes,
}

export default function AppRatingModal({ onClose }: AppRatingModalProps): JSX.Element | null {
  const { t } = useTranslation()
  const [state, setState] = useState(State.Initial)
  const dispatch = useDispatch()

  const stateConfig = {
    [State.Initial]: {
      title: t('appRating.extension.title'),
      description: t('appRating.description'),
      secondaryButtonText: t('appRating.button.notReally'),
      primaryButtonText: t('common.button.yes'),
      Icon: LikeSquare,
      iconSize: '$icon.24' as IconSizeTokens,
      onSecondaryButtonPress: () => setState(State.NotReally),
      onPrimaryButtonPress: () => setState(State.Yes),
    },
    [State.NotReally]: {
      title: t('appRating.feedback.title'),
      description: t('appRating.feedback.description'),
      secondaryButtonText: t('common.button.notNow'),
      primaryButtonText: t('appRating.feedback.button.send'),
      Icon: MessageText,
      iconSize: '$icon.18' as IconSizeTokens,
      onSecondaryButtonPress: () => onClose(),
      onPrimaryButtonPress: (): void => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        window.open(uniswapUrls.walletFeedbackForm)
        dispatch(setAppRating({ feedbackProvided: true }))
        onClose()
      },
    },
    [State.Yes]: {
      title: t('appRating.extension.review.title'),
      description: t('appRating.extension.review.description'),
      secondaryButtonText: t('common.button.notNow'),
      primaryButtonText: t('common.button.review'),
      Icon: Feedback,
      iconSize: '$icon.24' as IconSizeTokens,
      onSecondaryButtonPress: () => onClose(),
      onPrimaryButtonPress: (): void => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        window.open(`https://chromewebstore.google.com/detail/uniswap-extension/${chrome.runtime.id}/reviews`)
        dispatch(setAppRating({ ratingProvided: true }))
        onClose()
      },
    },
  }

  const {
    title,
    description,
    secondaryButtonText,
    primaryButtonText,
    Icon,
    iconSize,
    onSecondaryButtonPress,
    onPrimaryButtonPress,
  } = stateConfig[state]

  useEffect(() => {
    // just to set that prompt has been shown
    dispatch(setAppRating({}))
  }, [dispatch])

  return (
    <Modal isDismissible isModalOpen name={ModalName.TokenWarningModal} backgroundColor="$surface1" onClose={onClose}>
      <TouchableArea p="$spacing16" position="absolute" right={0} top={0} zIndex={zIndices.default} onPress={onClose}>
        <X color="$neutral2" size="$icon.20" />
      </TouchableArea>
      <Flex alignItems="center" gap="$spacing8" pt="$spacing16">
        <Flex centered backgroundColor="$accent2" width="$spacing48" height="$spacing48" borderRadius="$rounded12">
          <Icon color="$accent1" size={iconSize} />
        </Flex>
        <Flex alignItems="center" gap="$spacing8" pb="$spacing16" pt="$spacing8" px="$spacing4">
          <Text color="$neutral1" textAlign="center" variant="subheading2">
            {title}
          </Text>
          <Text color="$neutral2" textAlign="center" variant="body3">
            {description}
          </Text>
        </Flex>
        <Flex row width="100%" gap="$spacing12">
          <Button flex={1} flexBasis={1} size="small" theme="secondary" onPress={onSecondaryButtonPress}>
            {secondaryButtonText}
          </Button>
          <Button flex={1} flexBasis={1} size="small" theme="primary" onPress={onPrimaryButtonPress}>
            {primaryButtonText}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}