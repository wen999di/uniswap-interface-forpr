import Expand from 'components/Expand'
import { fireEvent, render, screen } from 'test-utils/render'
import noop from 'utilities/src/react/noop'

describe('Expand', () => {
  it('does not render children when closed', () => {
    render(
      <Expand header={<span>Header</span>} isOpen={false} onToggle={noop} button={<span>Button</span>}>
        Body
      </Expand>,
    )
    expect(screen.queryByText('Body')).not.toBeVisible()
  })

  it('renders children when open', () => {
    render(
      <Expand header={<span>Header</span>} isOpen={true} onToggle={noop} button={<span>Button</span>}>
        Body
      </Expand>,
    )
    expect(screen.queryByText('Body')).not.toBeNull()
  })

  it('calls `onToggle` when button is pressed', () => {
    const onToggle = jest.fn()
    render(
      <Expand header={<span>Header</span>} isOpen={false} onToggle={onToggle} button={<span>Button</span>}>
        Body
      </Expand>,
    )

    const button = screen.getByText('Button')

    fireEvent.click(button)
    expect(onToggle).toHaveBeenCalled()
  })
})
