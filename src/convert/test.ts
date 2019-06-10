import convert from '.'

describe('convert', () => {
  it('converts CSS components', () => {
    expect(convert({ Button: 'Button-xxx', Input: 'Input-xxx' })).toEqual({
      Button: {
        componentName: 'Button',
        tag: undefined,
        className: 'Button-xxx',
        props: {}
      },

      Input: {
        componentName: 'Input',
        tag: undefined,
        className: 'Input-xxx',
        props: {}
      }
    })
  })

  it('converts boolean props', () => {
    expect(
      convert({ Button: 'Button-xxx', 'Button-active': 'Button-active-xxx' })
    ).toEqual({
      Button: {
        componentName: 'Button',
        tag: undefined,
        className: 'Button-xxx',
        props: {
          active: {
            propName: 'active',
            type: 'boolean',
            className: 'Button-active-xxx'
          }
        }
      }
    })
  })

  it('parses enum props', () => {
    expect(
      convert({
        Text: 'Text-xxx',
        'Text-color-red': 'Text-color-red-xxx',
        'Text-color-green': 'Text-color-green-xxx'
      })
    ).toEqual({
      Text: {
        componentName: 'Text',
        tag: undefined,
        className: 'Text-xxx',
        props: {
          color: {
            propName: 'color',
            type: 'enum',
            values: ['red', 'green'],
            classNames: {
              red: 'Text-color-red-xxx',
              green: 'Text-color-green-xxx'
            }
          }
        }
      }
    })
  })

  it('converts enum props with boolean value', () => {
    expect(
      convert({
        'Spacing-padded': 'Spacing-padded-xxx',
        'Spacing-padded-small': 'Spacing-padded-small-xxx',
        'Spacing-padded-large': 'Spacing-padded-large-xxx',
        'Link-active-red': 'Link-active-red-xxx',
        'Link-active-green': 'Link-active-green-xxx',
        'Link-active': 'Link-active-xxx'
      })
    ).toEqual({
      Spacing: {
        componentName: 'Spacing',
        tag: undefined,
        className: undefined,
        props: {
          padded: {
            propName: 'padded',
            type: 'enum',
            values: [true, 'small', 'large'],
            classNames: {
              true: 'Spacing-padded-xxx',
              small: 'Spacing-padded-small-xxx',
              large: 'Spacing-padded-large-xxx'
            }
          }
        }
      },

      Link: {
        componentName: 'Link',
        tag: undefined,
        className: undefined,
        props: {
          active: {
            propName: 'active',
            type: 'enum',
            values: ['red', 'green', true],
            classNames: {
              red: 'Link-active-red-xxx',
              green: 'Link-active-green-xxx',
              true: 'Link-active-xxx'
            }
          }
        }
      }
    })
  })
})
